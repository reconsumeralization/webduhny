import type { IRecordsDataDeploymentTable } from "~/resolver/app/data/RecordsDataDeploymentTable.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import type { IDetailItem } from "~/sync/handler/types.js";
import type { IDeployment } from "~/resolver/deployment/types.js";
import type { DynamoDBTableType } from "~/types.js";

export interface ICreateRecordsDataDeploymentTableCallableParams {
    name: string;
    type: DynamoDBTableType;
}

export interface ICreateRecordsDataDeploymentTableCallable {
    (params: ICreateRecordsDataDeploymentTableCallableParams): IRecordsDataDeploymentTable;
}

export interface IRecordsDataDeploymentParams {
    deployment: IDeployment;
    createRecordsDataDeploymentTable: ICreateRecordsDataDeploymentTableCallable;
}

export interface IRecordsDataDeploymentIngestParams {
    items: NonEmptyArray<IDetailItem>;
}

/**
 * Represents a deployment where records came from.
 */
export interface IRecordsDataDeployment {
    deployment: IDeployment;
    ingest(params: IRecordsDataDeploymentIngestParams): Promise<void>;
    getTables(): IRecordsDataDeploymentTable[];
}

export class RecordsDataDeployment implements IRecordsDataDeployment {
    public readonly deployment: IDeployment;

    private readonly createRecordsDataDeploymentTable: ICreateRecordsDataDeploymentTableCallable;
    private readonly tables: IRecordsDataDeploymentTable[] = [];

    public constructor(params: IRecordsDataDeploymentParams) {
        this.deployment = params.deployment;
        this.createRecordsDataDeploymentTable = params.createRecordsDataDeploymentTable;
    }

    public async ingest(params: IRecordsDataDeploymentIngestParams): Promise<void> {
        const { items } = params;

        for (const item of items) {
            const table = this.getTable(item);

            table.add({
                ...item,
                command: item.command === "delete" ? "delete" : "put"
            });
        }
    }

    public getTables(): IRecordsDataDeploymentTable[] {
        return this.tables;
    }

    private getTable(item: IDetailItem): IRecordsDataDeploymentTable {
        const { tableName: name, tableType: type } = item;
        const existingTable = this.tables.find(item => item.name === name && item.type === type);
        if (existingTable) {
            return existingTable;
        }
        const newTable = this.createRecordsDataDeploymentTable({ name, type });
        this.tables.push(newTable);
        return newTable;
    }
}

export const createRecordsDataDeployment = (
    params: IRecordsDataDeploymentParams
): IRecordsDataDeployment => {
    return new RecordsDataDeployment(params);
};
