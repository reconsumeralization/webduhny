import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createSyncResourceName } from "./createSyncResourceName.js";
import type { EventBusArgs } from "@pulumi/aws/cloudwatch/eventBus.js";
import { SyncSystemSQS } from "~/apps/syncSystem/SyncSystemSQS.js";
import type { EventRuleArgs } from "@pulumi/aws/cloudwatch/eventRule.js";
import type { EventTargetArgs } from "@pulumi/aws/cloudwatch/eventTarget.js";

export const SyncSystemEventBus = createAppModule({
    name: "SyncSystemEventBus",
    config: (app: PulumiApp) => {
        const sqs = app.getModule(SyncSystemSQS);

        const eventBusName = createSyncResourceName("eventBus");

        const config: EventBusArgs = {
            name: eventBusName,
            description: "Connect deployed systems to Sync SQS"
        };
        const eventBus = app.addResource(aws.cloudwatch.EventBus, {
            name: eventBusName,
            config
        });

        const eventBusRuleConfig: EventRuleArgs = {
            eventBusName: eventBus.output.arn,
            eventPattern: JSON.stringify({
                "detail-type": ["synchronization-input"]
            })
        };

        const eventBusRule = app.addResource(aws.cloudwatch.EventRule, {
            name: createSyncResourceName("eventBusRule"),
            config: eventBusRuleConfig
        });

        const eventBusTargetConfig: EventTargetArgs = {
            rule: eventBusRule.output.name,
            eventBusName: eventBus.output.name,
            arn: sqs.output.arn,
            sqsTarget: {
                messageGroupId: "default"
            }
            // TODO add dead letter queue
            // deadLetterConfig: {
            //    arn: deadLetterQueue.output.arn
            // }
        };

        const eventBusTarget = app.addResource(aws.cloudwatch.EventTarget, {
            name: createSyncResourceName("eventBusEventTarget"),
            config: eventBusTargetConfig
        });

        const eventBusPolicy = app.addResource(aws.sqs.QueuePolicy, {
            name: createSyncResourceName("queuePolicy"),
            config: {
                queueUrl: sqs.output.id,
                policy: sqs.output.arn.apply(arn => {
                    return JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Effect: "Allow",
                                Principal: aws.iam.Principals.EventsPrincipal,
                                Action: "sqs:SendMessage",
                                Resource: arn,
                                Condition: {
                                    ArnEquals: {
                                        "aws:SourceArn": eventBusRule.output.arn
                                    }
                                }
                            }
                        ]
                    });
                })
            }
        });

        return {
            eventBus,
            eventBusRule,
            eventBusTarget,
            eventBusPolicy
        };
    }
});
