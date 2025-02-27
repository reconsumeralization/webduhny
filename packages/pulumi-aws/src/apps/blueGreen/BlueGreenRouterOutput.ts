import type { PulumiAppModule } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import type { IStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";

export type BlueGreenRouterOutput = PulumiAppModule<typeof BlueGreenRouterOutput>;

export interface IRouterStackOutput extends IStackOutput {
    dynamoDbTableArn: string;
    dynamoDbTableName: string;
    dynamoDbTableHashKey: string;
    dynamoDbTableRangeKey: string;
    cloudFrontId: string;
    cloudFrontArn: string;
}

export const BlueGreenRouterOutput = createAppModule({
    name: "BlueGreenRouterOutput",
    config(app) {
        return app.addHandler(async () => {
            const output = getStackOutput<IRouterStackOutput>({
                folder: "apps/blueGreen",
                env: app.params.run.env,
                variant: app.params.run.variant
            });

            if (!output) {
                throw new Error("Blue/Green Router application is not deployed.");
            }

            return {
                dynamoDbTableArn: output.dynamoDbTableArn,
                dynamoDbTableName: output.dynamoDbTableName,
                dynamoDbTableHashKey: output.dynamoDbTableHashKey,
                dynamoDbTableRangeKey: output.dynamoDbTableRangeKey,
                cloudfrontId: output.cloudFrontId,
                cloudfrontArn: output.cloudFrontArn
            };
        });
    }
});
