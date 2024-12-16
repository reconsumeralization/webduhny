import type { Entity as BaseEntity } from "dynamodb-toolbox";
import { createEntityWriteBatch, createTableWriteBatch } from "~/utils/batch";
import type { IEntityWriteBatch, ITableWriteBatch } from "~/utils/batch/types";
import type { TableDef } from "dynamodb-toolbox/dist/cjs/classes/Table";
import { IEntity } from "./types";
import { IPutParamsItem, put } from "~/utils/put";
import { get, getClean, GetRecordParamsKeys } from "~/utils/get";
import { deleteItem, IDeleteItemKeys } from "~/utils";

export class Entity implements IEntity {
    public readonly entity: BaseEntity;

    public constructor(entity: BaseEntity) {
        this.entity = entity;
    }

    public createEntityWriter(): IEntityWriteBatch {
        return createEntityWriteBatch({
            entity: this.entity
        });
    }

    public createTableWriter(): ITableWriteBatch {
        return createTableWriteBatch({
            table: this.entity.table as TableDef
        });
    }

    public async put(item: IPutParamsItem): ReturnType<typeof put> {
        return put({
            entity: this.entity,
            item
        });
    }

    public async get<T>(keys: GetRecordParamsKeys): ReturnType<typeof get<T>> {
        return get<T>({
            entity: this.entity,
            keys
        });
    }

    public async getClean<T>(keys: GetRecordParamsKeys): ReturnType<typeof getClean<T>> {
        return getClean<T>({
            entity: this.entity,
            keys
        });
    }

    public async delete(keys: IDeleteItemKeys): ReturnType<typeof deleteItem> {
        return deleteItem({
            entity: this.entity,
            keys
        });
    }
}

export const createEntity = (params: BaseEntity): IEntity => {
    return new Entity(params);
};
