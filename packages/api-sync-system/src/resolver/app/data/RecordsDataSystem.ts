import { ISystem } from "~/sync/types.js";
import type { IRecordsDataSystemTable } from "~/resolver/app/data/RecordsDataSystemTable.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import type { IDetailItem } from "~/sync/handler/types.js";

export interface ICreateRecordsDataSystemTableCallableParams {
    tableName: string;
}

export interface ICreateRecordsDataSystemTableCallable {
    (params: ICreateRecordsDataSystemTableCallableParams): IRecordsDataSystemTable;
}

export interface IRecordsDataSystemParams {
    system: ISystem;
    createRecordsDataSystemTable: ICreateRecordsDataSystemTableCallable;
}

export interface IRecordsDataSystemIngestParams {
    items: NonEmptyArray<IDetailItem>;
}

/**
 * Represents a system where records came from.
 */
export interface IRecordsDataSystem {
    system: ISystem;
    ingest(params: IRecordsDataSystemIngestParams): Promise<void>;
    getTables(): IRecordsDataSystemTable[];
}

export class RecordsDataSystem implements IRecordsDataSystem {
    public readonly system: ISystem;

    private readonly createRecordsDataSystemTable: ICreateRecordsDataSystemTableCallable;
    private readonly tables: IRecordsDataSystemTable[] = [];

    public constructor(params: IRecordsDataSystemParams) {
        this.system = params.system;
        this.createRecordsDataSystemTable = params.createRecordsDataSystemTable;
    }

    public async ingest(params: IRecordsDataSystemIngestParams): Promise<void> {
        const { items } = params;

        for (const item of items) {
            const table = this.getTable(item.tableName);

            table.add({
                ...item,
                command: item.command === "delete" ? "delete" : "put"
            });
        }
    }

    public getTables(): IRecordsDataSystemTable[] {
        return this.tables;
    }

    private getTable(tableName: string): IRecordsDataSystemTable {
        const existingTable = this.tables.find(item => item.name === tableName);
        if (existingTable) {
            return existingTable;
        }
        const newTable = this.createRecordsDataSystemTable({ tableName });
        this.tables.push(newTable);
        return newTable;
    }
}

export const createRecordsDataSystem = (params: IRecordsDataSystemParams): IRecordsDataSystem => {
    return new RecordsDataSystem(params);
};
