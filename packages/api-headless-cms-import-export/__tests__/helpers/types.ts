import { GenericRecord } from "@webiny/api-core/types";

export interface InvokeParams {
    httpMethod?: "POST" | "GET" | "OPTIONS";
    body?: {
        query: string;
        variables?: GenericRecord<string>;
    };
    headers?: GenericRecord<string, string>;
}

export interface IInvokeCb {
    <T = any>(params: InvokeParams): Promise<[T, any]>;
}
