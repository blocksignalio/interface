import Ajv, { JTDSchemaType, ValidateFunction } from "ajv/dist/jtd";
import * as config from "./config";
import {
    BackendResponse,
    ContractEvent,
    ContractEventInput,
    ContractLog,
} from "./types";

type ArrayValidator<T> = (x: any) => T[];

function makeValidator<T>(schema: JTDSchemaType<BackendResponse<T[] | null>>): ArrayValidator<T> {
    const ajv: Ajv = new Ajv({
        strictRequired: true,
        verbose: !config.release,
        unicodeRegExp: false,
    });
    const validate: ValidateFunction<BackendResponse<T[] | null>> = ajv.compile(schema);
    return function(x: any): T[] {
        if (validate(x)) {
            if (x.code !== 200) {
                throw new Error(`code=${x.code}`);
            }
            return x.data ?? [];
        }
        throw new Error("invalid");
    }
}

// +--------+
// | Events |
// +--------+

const inputSchema: JTDSchemaType<ContractEventInput> = {
    properties: {
        name: { type: "string" },
        type: { type: "string" },
        indexed: { type: "boolean" }
    }
};

const eventElementSchema: JTDSchemaType<ContractEvent> = {
    properties: {
        name: { type: "string" },
        signature: { type: "string" },
        id: { type: "string" },
        inputs: { elements: inputSchema }
    }
};

const eventsSchema: JTDSchemaType<BackendResponse<ContractEvent[] | null>> = {
    properties: {
        code: { type: "uint16" },
        message: { type: "string" },
        data: {
            nullable: true,
            elements: eventElementSchema,
        }
    }
};


// +------+
// | Logs |
// +------+

const logElementSchema: JTDSchemaType<ContractLog> = {
    properties: {
        address: { type: "string" },
        topic0: { type: "string" },
        topic1: { type: "string" },
        topic2: { type: "string" },
        topic3: { type: "string" },
        data: { type: "string" },
        blockNumber: { type: "int32" },
        txHash: { type: "string" },
        txIndex: { type: "int32" },
        index: { type: "int32" }
    }
};

const logsSchema: JTDSchemaType<BackendResponse<ContractLog[] | null>> = {
    properties: {
        code: { type: "uint16" },
        message: { type: "string" },
        data: {
            nullable: true,
            elements: logElementSchema,
        }
    }
};

// +------------+
// | Validators |
// +------------+

export const validateEvents: ArrayValidator<ContractEvent> = makeValidator<ContractEvent>(eventsSchema);
export const validateLogs: ArrayValidator<ContractLog> = makeValidator<ContractLog>(logsSchema);
