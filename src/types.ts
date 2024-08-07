import React from "react";
import { SetURLSearchParams } from "react-router-dom";

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export type UseState<T> = [T, Setter<T>];
export type UseTransition = [boolean, React.TransitionStartFunction];

export type UseSearchParams = [URLSearchParams, SetURLSearchParams];

export interface ContractEventInput {
    name: string;
    type: string;
    indexed: boolean;
}

export interface ContractEvent {
    name: string;
    signature: string;
    id: string;
    inputs: ContractEventInput[];
}

export interface ContractLog {
    address: string;
    topic0: string;
    topic1: string;
    topic2: string;
    topic3: string;
    data: string;
    blockNumber: number;
    txHash: string;
    txIndex: number;
    index: number;
}

export interface BackendResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

// export type ValidateFunction<T> = (_: any) => T;
