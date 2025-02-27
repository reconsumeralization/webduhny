import * as aws from "@pulumi/aws";
import type { PulumiApp, PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createDynamoDbGSI } from "~/utils/dynamodb";

export type BlueGreenRouterDynamoDb = PulumiAppModule<typeof BlueGreenRouterDynamoDb>;

export interface IBlueGreenRouterDynamoDbParams {
    region: aws.Provider;
    protect?: boolean;
}

export const BlueGreenRouterDynamoDb = createAppModule({
    name: "BlueGreenRouterDynamoDb",
    config(app: PulumiApp, params: IBlueGreenRouterDynamoDbParams) {
        const indexes = createDynamoDbGSI(["GSI1"]);
        return app.addResource(aws.dynamodb.Table, {
            name: "sync-table",
            config: {
                attributes: indexes.withAttributes([
                    {
                        name: "PK",
                        type: "S"
                    },
                    {
                        name: "SK",
                        type: "S"
                    }
                ]),
                billingMode: "PAY_PER_REQUEST",
                hashKey: "PK",
                rangeKey: "SK",
                globalSecondaryIndexes: indexes.withGlobalSecondaryIndexes([])
            },
            opts: {
                provider: params.region,
                protect: params.protect
            }
        });
    }
});
