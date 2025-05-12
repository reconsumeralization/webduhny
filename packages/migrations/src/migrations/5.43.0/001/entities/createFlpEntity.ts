import { Entity, Table } from "@webiny/db-dynamodb/toolbox";

export const createFlpEntity = (table: Table<string, string, string>) => {
    return new Entity({
        table,
        name: "ACO.flp",
        attributes: {
            PK: {
                partitionKey: true
            },
            SK: {
                sortKey: true
            },
            GSI1_PK: {
                type: "string",
                required: true
            },
            GSI1_SK: {
                type: "string",
                required: true
            },
            GSI2_PK: {
                type: "string",
                required: true
            },
            GSI2_SK: {
                type: "string",
                required: true
            },
            TYPE: {
                type: "string"
            },
            data: {
                type: "map"
            }
        }
    });
};
