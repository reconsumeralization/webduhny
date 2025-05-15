import type { GenericRecord } from "@webiny/api/types.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { ITable } from "~/sync/types.js";
import type { ISourceDataContainer } from "~/resolver/app/data/types.js";

export interface IFetcherExecParamsItem {
    PK: string;
    SK: string;
}

export interface IFetcherExecParams {
    deployment: IDeployment;
    table: ITable;
    items: IFetcherExecParamsItem[];
    maxBatchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
}

export interface IFetcherExecValidResult {
    error?: never;
    items: ISourceDataContainer;
}

export interface IFetcherExecErrorResult {
    error: Error;
    items?: never;
}

export type IFetcherExecResult = IFetcherExecValidResult | IFetcherExecErrorResult;

export interface IFetcher {
    exec(params: IFetcherExecParams): Promise<IFetcherExecResult>;
}

export interface IFetchExecuteExecuteParamsItem {
    PK: string;
    SK: string;
}

export interface IFetchExecuteExecuteParams {
    client: Pick<DynamoDBDocument, "send">;
    table: ITable;
    records: IFetchExecuteExecuteParamsItem[];
}

export type IFetchExecuteItem<T = GenericRecord> = T & {
    PK: string;
    SK: string;
    table: string;
};

export interface IFetchExecute {
    execute<T = GenericRecord>(params: IFetchExecuteExecuteParams): Promise<IFetchExecuteItem<T>[]>;
}
