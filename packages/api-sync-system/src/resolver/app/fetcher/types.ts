import type { GenericRecord } from "@webiny/api/types.js";
import type { IRecordsDataSystem } from "../data/RecordsDataSystem";
import type {
    IRecordsDataSystemTable,
    IRecordsDataSystemTableBundle
} from "~/resolver/app/data/RecordsDataSystemTable.js";

export interface IFetcherExecParams {
    system: IRecordsDataSystem;
    table: IRecordsDataSystemTable;
    bundle: IRecordsDataSystemTableBundle;
    maxBatchSize?: number;
    maxRetries?: number;
    retryDelay?: number;
}

export interface IFetcherExecResult<T = GenericRecord> {
    items: T[];
}

export interface IFetcher {
    exec<T = GenericRecord>(params: IFetcherExecParams): Promise<IFetcherExecResult<T>>;
}

export interface IFetchExecute {
    execute<T = GenericRecord>(): Promise<T[]>;
}
