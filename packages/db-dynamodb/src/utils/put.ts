import { Entity } from "~/toolbox";

export interface IPutParamsItem {
    PK: string;
    SK: string;
    [key: string]: any;
}

export interface IPutParams {
    entity: Entity;
    item: IPutParamsItem;
}

export const put = async (params: IPutParams) => {
    const { entity, item } = params;

    return await entity.put(item, {
        execute: true,
        strictSchemaCheck: false
    });
};
