import React, { useEffect, useState } from "react";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/router";
import { useLoaderData, useSearchParams } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import DashboardNav from "../components/DashboardNav";
import DashboardMain from "../components/DashboardMain";

import * as config from "../config";
import { ContractEvent, ContractLog, UseSearchParams, UseState } from "../types";
import { validateEvents, validateLogs } from "../validation";
import ProgressBar from "../components/ProgressBar";
import Footer from "../components/Footer";

import "./ContractPage.css";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs): Promise<string> => {
    return args.params.address ?? "";
}

interface Data {
    contract: string;
    loading: boolean;
    error: boolean;
    events: ContractEvent[];
    logs: ContractLog[];
};

const makeID: (prefix: string) => string = (function() {
    let counter: number = 0;
    return function(prefix: string): string {
        counter += 1;
        return `${prefix}-${counter}`;
    }
}());

async function load(contract: string, page: number = 0): Promise<Data> {
    const eventsURL: string = `${config.backend}/api/contracts/${contract}/events`;
    const logsURL: string = `${config.backend}/api/contracts/${contract}/logs?page=${page}`;

    const events: Promise<ContractEvent[]> = fetch(eventsURL)
        .then(async (resp: Response): Promise<any> => resp.json())
        .then(validateEvents)
        .then((events: ContractEvent[]): ContractEvent[] => events.sort(
            (lhs: ContractEvent, rhs: ContractEvent) => lhs.name.localeCompare(rhs.name)
        ));
    const logs: Promise<ContractLog[]> = fetch(logsURL)
        .then(async (resp: Response): Promise<any> => resp.json())
        .then(validateLogs);

    const data: Data = await Promise.all([events, logs])
        .then(([events, logs]: [ContractEvent[], ContractLog[]]): Data => {
            return {
                contract,
                loading: false,
                error: false,
                events,
                logs,
            };
        })
        .catch((reason: any): Data => {
            let message: string = "";
            if (reason instanceof Error) {
                message = `${reason.name}: ${reason.message}`;
            } else {
                message = "" + reason;
            }
            console.error(`ContractPage/loader: ${message}`);
            return {
                contract,
                loading: false,
                error: true,
                events: [],
                logs: [],
            };
        });

    return data;
}

function eventBySignature(events: ContractEvent[], sig: string): string {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === sig) {
            return events[i].name;
        }
    }
    return sig;
}

function EventList(props: { data: Data }): JSX.Element {
    if (props.data.error) {
        return <></>;
    }

    const items: Array<JSX.Element> = props.data.events.map((event: ContractEvent, index: number): JSX.Element => {
        const id: string = makeID("x-eventlist-item");
        return (
            <li className="nav-item small" key={index}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={event.name} id={id} defaultChecked title={event.signature} disabled />
                    <label className="form-check-label" htmlFor={id} title={event.signature}>
                        {event.name}
                    </label>
                </div>
            </li>
        );
    });

    return (
        <ul className="nav flex-column mb-2">
            { items }
        </ul>
    );
}

function LogList(props: { data: Data}): JSX.Element {
    if (props.data.loading) {
        return (
            <ProgressBar progress={0.5} fake={8} />
        );
    } else if (props.data.error) {
        return (
            <div className="alert alert-danger justify-content-center d-flex" role="alert">
                Failed to load contract data.  Check your contract address.
            </div>
        );
    } else {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Block</th>
                            <th scope="col">Event</th>
                            <th scope="col">Topic 1</th>
                            <th scope="col">Topic 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.logs.map(
                                (log: ContractLog, index: number): JSX.Element => {
                                    return (
                                        <tr key={index}>
                                            { /* <th scope="row">{ log.blockNumber }</th> */}
                                            <td>
                                                <a className="text-black" href={`https://etherscan.io/tx/${log.txHash}`}>
                                                    {log.blockNumber}
                                                </a>
                                            </td>
                                            <td>{eventBySignature(props.data.events, log.topic0)}</td>
                                            <td><code className="text-black">0x{log.topic1.slice(-40)}</code></td>
                                            <td><code className="text-black">0x{log.topic2.slice(-40)}</code></td>
                                        </tr>
                                    );
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const ContractPage: React.FunctionComponent = (): JSX.Element => {
    const [params, _]: UseSearchParams = useSearchParams();
    const contract = ("" + useLoaderData()).toLowerCase();
    const page: number = parseInt(params.get("page") ?? "0", 10);
    const [data, setData]: UseState<Data> = useState<Data>({
        contract,
        loading: true,
        error: false,
        events: [],
        logs: [],
    });
    useEffect(() => {
        load(contract, page).then(setData);
    }, [contract, page]);

    // const title: string = contract.slice(0, 6) + "…" + contract.slice(-4);
    const title: JSX.Element = <a className="text-black" href={`https://etherscan.io/address/${contract}`}>{contract}</a>;

    let body: JSX.Element;
    if (data.loading) {
        body = (
            <div className="col">
                <ProgressBar fake={180} />
            </div>
        );
    } else {
        const exportURL: string = `${config.backend}/api/contracts/${contract}/logs.json?page=${page}`;
        const exportButton = (
            <a className="btn btn-sm btn-outline-secondary" href={ exportURL }>
                Export
            </a>
        );
        body = (
            <>
                <DashboardNav title="Events">
                    <EventList data={ data } />
                </DashboardNav>
                <DashboardMain title={ title } buttons={ exportButton }>
                    <LogList data={ data } />
                </DashboardMain>
            </>
        );
    }

    return (
        <>
            <Dashboard> { body } </Dashboard>
            <Footer />
        </>
    );
}

export default ContractPage;
