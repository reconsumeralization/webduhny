import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import type { PulumiAppParam } from "@webiny/pulumi";
import { createPulumiApp } from "@webiny/pulumi";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants";
import { BlueGreenRouterDynamoDb } from "./BlueGreenRouterDynamoDb";
import { BlueGreenRouterCloudFront } from "./BlueGreenRouterCloudFront";

export type BlueGreenRouterPulumiApp = ReturnType<typeof createBlueGreenPulumiApp>;

export interface ElasticsearchConfig {
    domainName: string;
    indexPrefix: string;
    sharedIndexes: boolean;
}

export interface OpenSearchConfig {
    domainName: string;
    indexPrefix: string;
    sharedIndexes: boolean;
}

export interface CreateBlueGreenPulumiAppParams {
    /**
     * Secures against deleting database by accident.
     * By default enabled in production environments.
     */
    protect?: PulumiAppParam<boolean>;

    /**
     * Enables ElasticSearch infrastructure.
     * Note that it requires also changes in application code.
     */
    elasticSearch?: PulumiAppParam<boolean | Partial<ElasticsearchConfig>>;

    /**
     * Enables OpenSearch infrastructure.
     * Note that it requires also changes in application code.
     */
    openSearch?: PulumiAppParam<boolean | Partial<OpenSearchConfig>>;

    /**
     * Enables VPC for the application.
     * By default enabled in production environments.
     */
    vpc?: PulumiAppParam<boolean>;

    /**
     * Provides a way to adjust existing Pulumi code (cloud infrastructure resources)
     * or add additional ones into the mix.
     */
    pulumi?: (app: BlueGreenRouterPulumiApp) => void | Promise<void>;

    /**
     * Prefixes names of all Pulumi cloud infrastructure resource with given prefix.
     */
    pulumiResourceNamePrefix?: PulumiAppParam<string>;

    /**
     * Treats provided environments as production environments, which
     * are deployed in production deployment mode.
     * https://www.webiny.com/docs/architecture/deployment-modes/production
     */
    productionEnvironments?: PulumiAppParam<string[]>;
}

export function createBlueGreenPulumiApp(projectAppParams: CreateBlueGreenPulumiAppParams = {}) {
    return createPulumiApp({
        name: "blueGreen",
        path: "apps/blueGreen",
        config: projectAppParams,
        program: async app => {
            const productionEnvironments =
                app.params.create.productionEnvironments || DEFAULT_PROD_ENV_NAMES;
            const isProduction = productionEnvironments.includes(app.params.run.env);
            const protect = app.getParam(projectAppParams.protect) ?? isProduction;

            const blueGreenRegion = new aws.Provider(Region.USEast1, {
                region: Region.USEast1
            });
            /**
             * We need Cloudfront to sort out domains and routing.
             */
            const cloudFront = app.addModule(BlueGreenRouterCloudFront, {
                region: blueGreenRegion
            });
            /**
             * We need the DynamoDB table to write the blue and green system information into.
             */
            const dynamoDbTable = app.addModule(BlueGreenRouterDynamoDb, {
                protect,
                region: blueGreenRegion
            });

            return {
                router: {
                    region: blueGreenRegion,
                    dynamoDbTable,
                    dynamoDbTableArn: dynamoDbTable.output.arn,
                    dynamoDbTableHashKey: dynamoDbTable.output.hashKey,
                    dynamoDbTableRangeKey: dynamoDbTable.output.rangeKey,
                    cloudFront,
                    cloudfrontId: cloudFront.cloudFront.output.id,
                    cloudfrontArn: cloudFront.cloudFront.output.arn
                }
            };
        }
    });
}
