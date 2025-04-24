import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import type { IRecordsDataDeployment } from "../data/RecordsDataDeployment.js";
import type {
    IRecordsDataDeploymentTable,
    IRecordsDataDeploymentTableBundle
} from "../data/RecordsDataDeploymentTable.js";
import type { GenericRecord } from "@webiny/api/types";
import type { IDeployment } from "~/resolver/deployment/types.js";

export interface IStorerExecParams<T = GenericRecord> {
    deployment: IRecordsDataDeployment;
    table: IRecordsDataDeploymentTable;
    bundle: IRecordsDataDeploymentTableBundle;
    items: T[];
}

export interface IStorer {
    exec(params: IStorerExecParams): Promise<void>;
}

export interface IStoreExecuteExecuteParams<T> {
    table: string;
    items: T[];
    bundle: IRecordsDataDeploymentTableBundle;
    deployment: IDeployment;
    client: Pick<DynamoDBDocument, "send">;
}

export interface IStoreExecute<T = GenericRecord> {
    execute(params: IStoreExecuteExecuteParams<T>): Promise<void>;
}
