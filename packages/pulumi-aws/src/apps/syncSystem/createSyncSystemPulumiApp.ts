import { createPulumiApp, PulumiAppParam } from "@webiny/pulumi";
import { SyncSystemDynamo } from "./SyncSystemDynamo";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants";
import { SyncSystemSQS } from "./SyncSystemSQS";
import { SyncSystemLambda } from "./SyncSystemLambda";
import { addTableItems } from "./addTableItems";

export type SyncSystemPulumiApp = ReturnType<typeof createSyncSystemPulumiApp>;

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

export interface CreateSyncSystemPulumiAppParams {
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
    pulumi?: (app: SyncSystemPulumiApp) => void | Promise<void>;

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

export function createSyncSystemPulumiApp(projectAppParams: CreateSyncSystemPulumiAppParams = {}) {
    return createPulumiApp({
        name: "syncSystem",
        path: "apps/syncSystem",
        config: projectAppParams,
        program: async app => {
            const productionEnvironments =
                app.params.create.productionEnvironments || DEFAULT_PROD_ENV_NAMES;
            const isProduction = productionEnvironments.includes(app.params.run.env);
            const protect = app.getParam(projectAppParams.protect) ?? isProduction;

            const dynamoDbTable = app.addModule(SyncSystemDynamo, {
                protect
            });

            const sqs = app.addModule(SyncSystemSQS, {
                protect
            });

            app.addModule(SyncSystemLambda, {
                protect,
                config: {
                    // TODO
                }
            });
            /**
             * Add
             */
            addTableItems({
                app,
                table: dynamoDbTable,
                items: {}
            });

            return {
                /**
                 * Sync System resources.
                 */
                dynamodbTable: dynamoDbTable,
                dynamodbTableArn: dynamoDbTable.output.arn,
                dynamodbTableName: dynamoDbTable.output.name,
                dynamodbTableHashKey: dynamoDbTable.output.hashKey,
                dynamodbTableRangeKey: dynamoDbTable.output.rangeKey,
                sqs,
                sqsArn: sqs.output.arn,
                /**
                 * Systems we are connecting together.
                 */
                primary: {},
                secondary: {}
            };
        }
    });
}
