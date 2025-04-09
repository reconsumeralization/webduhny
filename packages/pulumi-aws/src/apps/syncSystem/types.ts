import * as pulumi from "@pulumi/pulumi";
import type { IStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils/index.js";

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
