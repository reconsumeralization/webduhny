import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import type { PulumiApp } from "@webiny/pulumi";
import type { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb";

export interface IAddTableItemsParams {
    app: PulumiApp;
    table: BlueGreenRouterDynamoDb;
    partitionKey: string;
    sortKey: string;
    value: Record<string, string | number | Record<string, string | number>>;
    region: aws.Provider;
}

export const addTableItems = (params: IAddTableItemsParams): void => {
    const { app, table, partitionKey, sortKey, value, region } = params;

    const item = buildTableItem({
        PK: partitionKey,
        SK: sortKey,
        value: JSON.stringify(value)
    });

    app.addResource(aws.dynamodb.TableItem, {
        name: "blueGreenSystemSettings",
        opts: {
            provider: region
        },
        config: {
            tableName: table.output.arn,
            hashKey: table.output.hashKey,
            rangeKey: pulumi.output(table.output.rangeKey).apply(key => key || "SK"),
            item: pulumi.interpolate`${item}`
        }
    });
};

const getTableItemType = (value: unknown) => {
    if (value === null || value === undefined) {
        return "S";
    }
    switch (typeof value) {
        case "string":
            return "S";
        case "number":
            return "N";
        case "object":
            return "M";
        default:
            throw new Error(`Unsupported type: ${typeof value}`);
    }
};

const buildTableItem = (
    items: Record<string, string | number | Record<string, string>>
): string => {
    const result = Object.keys(items).reduce<Record<string, any>>((output, key) => {
        const value = items[key];

        const type = getTableItemType(value);

        output[key] = {
            [type]: value
        };

        return output;
    }, {});

    return JSON.stringify(result);
};
