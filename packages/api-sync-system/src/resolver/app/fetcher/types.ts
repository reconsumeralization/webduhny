import type { GenericRecord } from "@webiny/api/types.js";
import type { IRecordsDataDeployment } from "../data/RecordsDataDeployment.js";
import type {
    IRecordsDataDeploymentTable,
    IRecordsDataDeploymentTableBundle
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";

export interface IFetcherExecParams {
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
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

export interface IFetchExecuteExecuteParams {
    client: Pick<DynamoDBDocument, "send">;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
}

export interface IFetchExecute {
    execute<T = GenericRecord>(params: IFetchExecuteExecuteParams): Promise<T[]>;
}
