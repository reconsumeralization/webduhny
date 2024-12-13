import type { Entity } from "dynamodb-toolbox";
import { batchWriteAll } from "./batchWrite";
import type {
    BatchWriteItem,
    BatchWriteResult,
    IDeleteBatchItem,
    IEntityWriteBatch,
    IEntityWriteBatchBuilder,
    IPutBatchItem,
    ITableWriteBatch
} from "./types";
import { createTableWriteBatch } from "./TableWriteBatch";
import type { TableDef } from "~/toolbox";
import { createEntityWriteBatchBuilder } from "./EntityWriteBatchBuilder";

export interface IEntityWriteBatchParams {
    entity: Entity;
    put?: IPutBatchItem[];
    delete?: IDeleteBatchItem[];
}

export class EntityWriteBatch implements IEntityWriteBatch {
    private readonly entity: Entity;
    private readonly items: BatchWriteItem[] = [];
    private readonly builder: IEntityWriteBatchBuilder;

    public constructor(params: IEntityWriteBatchParams) {
        if (!params.entity.name) {
            throw new Error(`No name provided for entity.`);
        } else if (!params.entity.table) {
            throw new Error(`No table provided for entity ${params.entity.name}.`);
        }
        this.entity = params.entity;
        this.builder = createEntityWriteBatchBuilder(this.entity);
        for (const item of params.put || []) {
            this.put(item);
        }
        for (const item of params.delete || []) {
            this.delete(item);
        }
    }

    public put<T extends Record<string, any>>(item: IPutBatchItem<T>): void {
        this.items.push(this.builder.put(item));
    }

    public delete(item: IDeleteBatchItem): void {
        this.items.push(this.builder.delete(item));
    }

    public combine(items: BatchWriteItem[]): ITableWriteBatch {
        return createTableWriteBatch({
            table: this.entity!.table as TableDef,
            items: this.items.concat(items)
        });
    }

    public async execute(): Promise<BatchWriteResult> {
        return await batchWriteAll({
            items: this.items,
            table: this.entity.table
        });
    }
}

export const createEntityWriteBatch = (params: IEntityWriteBatchParams): IEntityWriteBatch => {
    return new EntityWriteBatch(params);
};
