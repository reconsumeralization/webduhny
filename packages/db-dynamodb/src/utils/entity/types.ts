import type { Entity as BaseEntity } from "dynamodb-toolbox";
import type { IEntityReadBatch, IEntityWriteBatch, ITableWriteBatch } from "~/utils/batch/types";
import {
    deleteItem,
    get,
    getClean,
    GetRecordParamsKeys,
    IDeleteItemKeys,
    IPutParamsItem,
    put,
    QueryAllParams,
    QueryOneParams
} from "~/utils";

export type IEntityQueryOneParams = Omit<QueryOneParams, "entity">;

export type IEntityQueryAllParams = Omit<QueryAllParams, "entity">;

export interface IEntity {
    readonly entity: BaseEntity;
    createEntityReader(): IEntityReadBatch;
    createEntityWriter(): IEntityWriteBatch;
    createTableWriter(): ITableWriteBatch;
    put(item: IPutParamsItem): ReturnType<typeof put>;
    get<T>(keys: GetRecordParamsKeys): ReturnType<typeof get<T>>;
    getClean<T>(keys: GetRecordParamsKeys): ReturnType<typeof getClean<T>>;
    delete(keys: IDeleteItemKeys): ReturnType<typeof deleteItem>;
    queryOne<T>(params: IEntityQueryOneParams): Promise<T | null>;
    queryAll<T>(params: IEntityQueryAllParams): Promise<T[]>;
}
