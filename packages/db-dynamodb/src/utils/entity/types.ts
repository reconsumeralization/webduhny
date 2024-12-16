import { Entity as BaseEntity } from "dynamodb-toolbox";
import { IEntityWriteBatch, ITableWriteBatch } from "~/utils/batch/types";

export interface IEntity {
    readonly entity: BaseEntity;
    createEntityWriter(): IEntityWriteBatch;
    createTableWriter(): ITableWriteBatch;
}
