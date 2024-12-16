import type { Entity, TableDef } from "~/toolbox";
import { batchWriteAll } from "~/utils/batch/batchWrite";
import type {
    BatchWriteItem,
    BatchWriteResult,
    IDeleteBatchItem,
    IPutBatchItem
} from "~/utils/batch/types";
import type { IEntityWriteBatch, IEntityWriteBatchBuilder } from "./types";
import type { ITableWriteBatch } from "~/utils/table/types";
import { createTableWriteBatch } from "~/utils/table/TableWriteBatch";
import { createEntityWriteBatchBuilder } from "./EntityWriteBatchBuilder";

export interface IEntityWriteBatchParams {
    entity: Entity;
    put?: IPutBatchItem[];
    delete?: IDeleteBatchItem[];
}

export class EntityWriteBatch implements IEntityWriteBatch {
    private readonly entity: Entity;
    private readonly _items: BatchWriteItem[] = [];
    private readonly builder: IEntityWriteBatchBuilder;

    public get total(): number {
        return this._items.length;
    }

    public get items(): BatchWriteItem[] {
        return Array.from(this._items);
    }

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
        this._items.push(this.builder.put(item));
    }

    public delete(item: IDeleteBatchItem): void {
        this._items.push(this.builder.delete(item));
    }

    public combine(items: BatchWriteItem[]): ITableWriteBatch {
        return createTableWriteBatch({
            table: this.entity!.table as TableDef,
            items: this._items.concat(items)
        });
    }

    public async execute(): Promise<BatchWriteResult> {
        if (this._items.length === 0) {
            return [];
        }
        const items = Array.from(this._items);
        this._items.length = 0;
        return await batchWriteAll({
            items,
            table: this.entity.table
        });
    }
}

export const createEntityWriteBatch = (params: IEntityWriteBatchParams): IEntityWriteBatch => {
    return new EntityWriteBatch(params);
};
