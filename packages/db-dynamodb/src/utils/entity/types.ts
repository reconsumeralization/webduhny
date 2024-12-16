import type { Entity as BaseEntity } from "dynamodb-toolbox";
import type { IEntityReadBatch, IEntityWriteBatch, ITableWriteBatch } from "~/utils/batch/types";
import type {
    deleteItem,
    get,
    getClean,
    GetRecordParamsKeys,
    IDeleteItemKeys,
    IPutParamsItem,
    put
} from "~/utils";

export interface IEntity {
    readonly entity: BaseEntity;
    createEntityReader(): IEntityReadBatch;
    createEntityWriter(): IEntityWriteBatch;
    createTableWriter(): ITableWriteBatch;
    put(item: IPutParamsItem): ReturnType<typeof put>;
    get<T>(keys: GetRecordParamsKeys): ReturnType<typeof get<T>>;
    getClean<T>(keys: GetRecordParamsKeys): ReturnType<typeof getClean<T>>;
    delete(keys: IDeleteItemKeys): ReturnType<typeof deleteItem>;
}
