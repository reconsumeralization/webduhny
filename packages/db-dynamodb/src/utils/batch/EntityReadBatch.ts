import type {
    IEntityReadBatch,
    IEntityReadBatchBuilder,
    IEntityReadBatchBuilderGetResponse,
    IEntityReadBatchKey,
    IPutBatchItem
} from "./types";
import type { Entity } from "dynamodb-toolbox";
import type { TableDef } from "dynamodb-toolbox/dist/cjs/classes/Table/types";
import { batchReadAll } from "./batchRead";
import { GenericRecord } from "@webiny/api/types";
import { createEntityReadBatchBuilder } from "./EntityReadBatchBuilder";

export interface IEntityReadBatchParams {
    entity: Entity;
    read?: IPutBatchItem[];
}

export class EntityReadBatch implements IEntityReadBatch {
    private readonly entity: Entity;
    private readonly builder: IEntityReadBatchBuilder;
    private readonly items: IEntityReadBatchBuilderGetResponse[] = [];

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
            this.items.push(
                ...input.map(item => {
                    return this.builder.get(item);
                })
            );
            return;
        }
        this.items.push(this.builder.get(input));
    }

    public async execute<T = GenericRecord>() {
        return await batchReadAll<T>({
            table: this.entity.table as TableDef,
            items: this.items
        });
    }
}

export const createEntityReadBatch = (params: IEntityReadBatchParams): IEntityReadBatch => {
    return new EntityReadBatch(params);
};
