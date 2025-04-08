import type { Provider } from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import type { IStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";

export interface IDeployment {
    /**
     * Name by this deployment will be accessible in the Pulumi program.
     */
    name: string;
    env: string;
    variant: string | undefined;
}

export interface IRegionProvider {
    provider: Provider;
    name: string;
}

export type PulumiOutput<T> = {
    [K in keyof T]: pulumi.Output<T[K]>;
};

export interface IGetSyncSystemOutputResult extends IStackOutput {
    /**
     * createRegionProvider
     */
    region: string;
    /**
     * SyncSystemSQS
     */
    sqsUrl: string;
    sqsArn: string;
    sqsName: string;
    /**
     * DynamoDb
     */
    dynamoDbArn: string;
    dynamoDbName: string;
    dynamoDbHashKey: string;
    dynamoDbRangeKey: string;
    /**
     * SyncSystemLambda
     */
    lambdaArn: string;
    lambdaName: string;
    lambdaRoleArn: string;
    lambdaRoleName: string;
    lambdaRoleId: string;
    lambdaPolicyArn: string;
    lambdaPolicyName: string;
    lambdaPolicyId: string;
    lambdaEventSourceMappingId: string;
    lambdaEventSourceMappingArn: string;
    lambdaEventSourceMappingEventSourceArn: string;
    /**
     * SyncSystemEventBus
     */
    eventBusArn: string;
    eventBusName: string;
    eventBusRuleArn: string;
    eventBusRuleName: string;
    eventBusTargetArn: string;
    eventBusPolicyUrn: string;
    eventBusPolicyQueueUrl: string;
}
