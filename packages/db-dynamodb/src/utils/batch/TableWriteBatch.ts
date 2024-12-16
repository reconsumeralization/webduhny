import { Entity, TableDef } from "~/toolbox";
import {
    BatchWriteItem,
    BatchWriteResult,
    IDeleteBatchItem,
    IEntityWriteBatchBuilder,
    IPutBatchItem,
    ITableWriteBatch
} from "./types";
import { batchWriteAll } from "./batchWrite";
import { createEntityWriteBatchBuilder } from "~/utils/batch/EntityWriteBatchBuilder";

export interface ITableWriteBatchParams {
    table: TableDef;
    items?: BatchWriteItem[];
}

export class TableWriteBatch implements ITableWriteBatch {
    private readonly table: TableDef;
    private readonly items: BatchWriteItem[] = [];
    private readonly builders: Map<string, IEntityWriteBatchBuilder> = new Map();

    public get total(): number {
        return this.items.length;
    }

    public constructor(params: ITableWriteBatchParams) {
        this.table = params.table;
        if (!params.items?.length) {
            return;
        }
        this.items.push(...params.items);
    }

    public put(entity: Entity, item: IPutBatchItem): void {
        const builder = this.getBuilder(entity);
        this.items.push(builder.put(item));
    }

    public delete(entity: Entity, item: IDeleteBatchItem): void {
        const builder = this.getBuilder(entity);
        this.items.push(builder.delete(item));
    }

    public combine(items: BatchWriteItem[]): ITableWriteBatch {
        return createTableWriteBatch({
            table: this.table,
            items: this.items.concat(items)
        });
    }

    public async execute(): Promise<BatchWriteResult> {
        if (this.items.length === 0) {
            return [];
        }
        const items = [...this.items];
        this.items.length = 0;
        return await batchWriteAll({
            items,
            table: this.table
        });
    }

    private getBuilder(entity: Entity): IEntityWriteBatchBuilder {
        if (!entity.name) {
            throw new Error("Entity must have a name.");
        }
        const builder = this.builders.get(entity.name);
        if (builder) {
            return builder;
        }
        const newBuilder = createEntityWriteBatchBuilder(entity);
        this.builders.set(entity.name, newBuilder);
        return newBuilder;
    }
}

export const createTableWriteBatch = (params: ITableWriteBatchParams): ITableWriteBatch => {
    return new TableWriteBatch(params);
};
