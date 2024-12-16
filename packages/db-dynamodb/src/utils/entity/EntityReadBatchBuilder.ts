import type { Entity } from "~/toolbox";
import type {
    IEntityReadBatchBuilder,
    IEntityReadBatchBuilderGetResponse,
    IEntityReadBatchKey
} from "./types";
import { WebinyError } from "@webiny/error";

export class EntityReadBatchBuilder implements IEntityReadBatchBuilder {
    private readonly entity: Entity;

    public constructor(entity: Entity) {
        this.entity = entity;
    }

    public get(item: IEntityReadBatchKey): IEntityReadBatchBuilderGetResponse {
        const result = this.entity.getBatch(item);
        if (!result.Table) {
            throw new WebinyError(`No table provided for entity ${this.entity.name}.`);
        } else if (!result.Key) {
            throw new WebinyError(`No key provided for entity ${this.entity.name}.`);
        }
        return result as IEntityReadBatchBuilderGetResponse;
    }
}

export const createEntityReadBatchBuilder = (entity: Entity): IEntityReadBatchBuilder => {
    return new EntityReadBatchBuilder(entity);
};
