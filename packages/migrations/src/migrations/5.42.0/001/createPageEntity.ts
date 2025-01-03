import { Table, AttributeDefinitions } from "@webiny/db-dynamodb/toolbox";
import { createLegacyEntity } from "~/utils";

const oldAttributes: AttributeDefinitions = {
    PK: {
        partitionKey: true
    },
    SK: {
        sortKey: true
    },
    TYPE: {
        type: "string"
    },
    id: {
        type: "string"
    },
    pid: {
        type: "string"
    },
    tenant: {
        type: "string"
    },
    locale: {
        type: "string"
    },
    title: {
        type: "string"
    },
    titleLC: {
        type: "string"
    },
    editor: {
        type: "string"
    },
    createdFrom: {
        type: "string"
    },
    path: {
        type: "string"
    },
    category: {
        type: "string"
    },
    content: {
        type: "map"
    },
    publishedOn: {
        type: "string"
    },
    version: {
        type: "number"
    },
    settings: {
        type: "map"
    },
    locked: {
        type: "boolean"
    },
    status: {
        type: "string"
    },
    createdOn: {
        type: "string"
    },
    savedOn: {
        type: "string"
    },
    createdBy: {
        type: "map"
    },
    ownedBy: {
        type: "map"
    },
    webinyVersion: {
        type: "string"
    }
};

export const createOldPageEntity = (table: Table<string, string, string>) => {
    return createLegacyEntity(table, "PbPage", oldAttributes);
};

export const createNewPageEntity = (table: Table<string, string, string>) => {
    return createLegacyEntity(table, "PbPage", {
        ...oldAttributes,
        data: {
            type: "map"
        }
    });
};
