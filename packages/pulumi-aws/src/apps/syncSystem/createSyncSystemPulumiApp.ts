import { Region } from "@pulumi/aws";
import { createPulumiApp, PulumiAppParam } from "@webiny/pulumi";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants.js";
import { SyncSystemSQS } from "./SyncSystemSQS.js";
import { SyncSystemInputLambda } from "./SyncSystemInputLambda.js";
import { SyncSystemS3 } from "./SyncSystemS3.js";
import type { IDeployment } from "./types.js";
import { createRegionProvider } from "~/apps/syncSystem/createRegionProvider.js";

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

    deployments: () => [IDeployment, IDeployment];
}

export function createSyncSystemPulumiApp(projectAppParams: CreateSyncSystemPulumiAppParams) {
    return createPulumiApp({
        name: "syncSystem",
        path: "apps/syncSystem",
        config: projectAppParams,
        program: async app => {
            const productionEnvironments =
                app.params.create.productionEnvironments || DEFAULT_PROD_ENV_NAMES;
            const isProduction = productionEnvironments.includes(app.params.run.env);
            const protect = app.getParam(projectAppParams.protect) ?? isProduction;

            const region = createRegionProvider({
                region: Region.USEast1
            });

            const s3 = app.addModule(SyncSystemS3, {
                protect,
                region
            });

            const sqs = app.addModule(SyncSystemSQS, {
                protect,
                region
            });

            const inputLambda = app.addModule(SyncSystemInputLambda, {
                protect,
                region
            });

            return {
                s3: s3.output,
                sqs: sqs.output,
                inputLambda: inputLambda.lambda.output,
                inputLambdaRole: inputLambda.role.output,
                inputLambdaPolicy: inputLambda.policy.output,
                /**
                 * Systems we are connecting together.
                 */
                primary: {},
                secondary: {}
            };
        }
    });
}
