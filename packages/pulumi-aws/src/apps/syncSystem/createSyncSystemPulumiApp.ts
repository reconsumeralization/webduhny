import * as pulumi from "@pulumi/pulumi";
import { Region } from "@pulumi/aws";
import { createPulumiApp, PulumiAppParam } from "@webiny/pulumi";
import { DEFAULT_PROD_ENV_NAMES } from "~/constants.js";
import { SyncSystemSQS } from "./SyncSystemSQS.js";
import { SyncSystemLambda } from "./SyncSystemLambda.js";
import type { IDeployment, IGetSyncSystemOutputResult, PulumiOutput } from "./types.js";
import { createRegionProvider } from "./createRegionProvider.js";
import { APPS_SYNC_SYSTEM_PATH } from "./constants.js";
import { SyncSystemEventBus } from "./SyncSystemEventBus.js";
import { appWithRegion } from "./appWithRegion.js";
import { attachDeployments } from "~/apps/syncSystem/deployments/attachDeployments.js";

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

export interface IDeploymentsCallableParams {
    env: string;
}

export interface IDeploymentsCallable {
    (params: IDeploymentsCallableParams): [IDeployment, IDeployment];
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

    deployments: IDeploymentsCallable;
}

export function createSyncSystemPulumiApp(projectAppParams: CreateSyncSystemPulumiAppParams) {
    return createPulumiApp({
        name: "sync",
        path: APPS_SYNC_SYSTEM_PATH,
        config: projectAppParams,
        program: async app => {
            const region = createRegionProvider({
                region: Region.USEast1
            });
            const productionEnvironments =
                app.params.create.productionEnvironments || DEFAULT_PROD_ENV_NAMES;
            const isProduction = productionEnvironments.includes(app.params.run.env);
            const protect = app.getParam(projectAppParams.protect) ?? isProduction;
            const regionApp = appWithRegion({
                app,
                region,
                protect
            });
            /**
             * Sync System services.
             */
            const sqs = regionApp.addModule(SyncSystemSQS);

            const lambda = regionApp.addModule(SyncSystemLambda);
            const { eventBusRule, eventBus, eventBusTarget, eventBusPolicy } =
                regionApp.addModule(SyncSystemEventBus);
            /**
             * Connect sync system to the deployments.
             */
            const deployments = projectAppParams.deployments({
                env: app.params.run.env
            });

            await attachDeployments({
                app: regionApp,
                deployments
            });

            const output: PulumiOutput<IGetSyncSystemOutputResult> = {
                /**
                 * Region provider.
                 */
                region: pulumi.output(region.name),
                /**
                 * SyncSystemSQS
                 */
                sqsUrl: sqs.output.url,
                sqsArn: sqs.output.arn,
                sqsName: sqs.output.name,
                /**
                 * SyncSystemLambda
                 */
                lambdaArn: lambda.lambda.output.arn,
                lambdaName: lambda.lambda.output.name,
                lambdaRoleArn: lambda.role.output.arn,
                lambdaRoleName: lambda.role.output.name,
                lambdaRoleId: lambda.role.output.id,
                lambdaPolicyArn: lambda.policy.output.arn,
                lambdaPolicyName: lambda.policy.output.name,
                lambdaPolicyId: lambda.policy.output.id,
                lambdaEventSourceMappingArn: lambda.eventSourceMapping.output.arn,
                lambdaEventSourceMappingId: lambda.eventSourceMapping.output.id,
                /**
                 * We can safely cast as we that the property exists.
                 */
                lambdaEventSourceMappingEventSourceArn: lambda.eventSourceMapping.output
                    .eventSourceArn as pulumi.Output<string>,
                /**
                 * SyncSystemEventBus
                 */
                eventBusArn: eventBus.output.arn,
                eventBusName: eventBus.output.name,
                eventBusRuleArn: eventBusRule.output.arn,
                eventBusRuleName: eventBusRule.output.id,
                eventBusTargetArn: eventBusTarget.output.arn,
                eventBusPolicyId: eventBusPolicy.output.id,
                eventBusPolicyUrn: eventBusPolicy.output.urn,
                eventBusPolicyQueueUrl: eventBusPolicy.output.queueUrl
            };
            app.addOutputs(output);

            return {
                region: region.provider,
                sqs: sqs.output,
                eventBus: eventBus.output,
                eventBusRule: eventBusRule.output,
                eventBusTarget: eventBusTarget.output,
                eventBusPolicy: eventBusPolicy.output,
                lambda: lambda.lambda.output,
                lambdaRole: lambda.role.output,
                lambdaPolicy: lambda.policy.output,
                lambdaEventSourceMapping: lambda.eventSourceMapping.output,
                /**
                 * Systems we are connecting together.
                 */
                primary: {},
                secondary: {}
            };
        }
    });
}
