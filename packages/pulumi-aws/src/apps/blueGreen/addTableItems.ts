import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import type { PulumiApp } from "@webiny/pulumi";
import type { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb";

export interface IAddTableItemsParams {
    app: PulumiApp;
    table: BlueGreenRouterDynamoDb;
    partitionKey: string;
    sortKey: string;
    value: Record<string, string | number | Record<string, string>>;
}

export const addTableItems = (params: IAddTableItemsParams): void => {
    const { app, table, partitionKey, sortKey, value } = params;
    /**
     * Store some settings in the table.
     */
    app.addResource(aws.dynamodb.TableItem, {
        name: "blueGreenSystemSettings",
        config: {
            tableName: table.output.arn,
            hashKey: table.output.hashKey,
            rangeKey: pulumi.output(table.output.rangeKey).apply(key => key || "SK"),
            item: pulumi.interpolate`{
              ${buildTableItems({
                  PK: partitionKey,
                  SK: sortKey,
                  value: JSON.stringify(value)
              })}
            }`
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

const buildTableItems = (
    items: Record<string, string | number | Record<string, string>>
): string => {
    return Object.keys(items)
        .reduce<string[]>((output, key) => {
            const value = items[key];
            output.push(`"${key}": {"${getTableItemType(value)}": "${value}"}`);
            return output;
        }, [])
        .join(",");
};
