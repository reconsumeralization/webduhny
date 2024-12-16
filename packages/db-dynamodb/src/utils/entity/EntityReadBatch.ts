import type { IPutBatchItem } from "~/utils/batch/types";
import type {
    IEntityReadBatch,
    IEntityReadBatchBuilder,
    IEntityReadBatchBuilderGetResponse,
    IEntityReadBatchKey
} from "./types";
import type { Entity, TableDef } from "~/toolbox";
import { batchReadAll } from "~/utils/batch/batchRead";
import { GenericRecord } from "@webiny/api/types";
import { createEntityReadBatchBuilder } from "./EntityReadBatchBuilder";

export interface IEntityReadBatchParams {
    entity: Entity;
    read?: IPutBatchItem[];
}

export class EntityReadBatch implements IEntityReadBatch {
    private readonly entity: Entity;
    private readonly builder: IEntityReadBatchBuilder;
    private readonly _items: IEntityReadBatchBuilderGetResponse[] = [];

    public constructor(params: IEntityReadBatchParams) {
        if (!params.entity.name) {
            throw new Error(`No name provided for entity.`);
        } else if (!params.entity.table) {
            throw new Error(`No table provided for entity ${params.entity.name}.`);
        }
        this.entity = params.entity;
        this.builder = createEntityReadBatchBuilder(this.entity);
    }
    public get(input: IEntityReadBatchKey | IEntityReadBatchKey[]): void {
        if (Array.isArray(input)) {
            this._items.push(
                ...input.map(item => {
                    return this.builder.get(item);
                })
            );
            return;
        }
        this._items.push(this.builder.get(input));
    }

    public async execute<T = GenericRecord>() {
        return await batchReadAll<T>({
            table: this.entity.table as TableDef,
            items: this._items
        });
    }
}

export const createEntityReadBatch = (params: IEntityReadBatchParams): IEntityReadBatch => {
    return new EntityReadBatch(params);
};
