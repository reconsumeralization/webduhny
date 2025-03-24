import * as aws from "@pulumi/aws";
import type { QueueArgs } from "@pulumi/aws/sqs";
import type { PulumiApp } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createResourceName } from "./createResourceName.js";
import type { RegionProvider } from "./types.js";

export interface ISyncSystemSQSParams {
    protect: boolean;
    region: RegionProvider;
}

export const SyncSystemSQS = createAppModule({
    name: "SyncSystemSQS",
    config: (app: PulumiApp, params: ISyncSystemSQSParams) => {
        const config: QueueArgs = {
            delaySeconds: 0,
            visibilityTimeoutSeconds: 900,
            fifoQueue: true,
            receiveWaitTimeSeconds: 0,
            deduplicationScope: "queue",
            /**
             * The maximum message size is 256 KB.
             * Chunks are billed in 64KB increments, so let's keep the message size below that.
             * TODO we will store the message in S3 and only store the reference in the queue.
             * TODO Use batching to reduce costs.
             */
            maxMessageSize: 60 * 1024, // KB
            /**
             * How log do we keep the message in the queue?
             */
            messageRetentionSeconds: 4 /* days */ * 24 * 60 * 60,
            /**
             * No need to encrypt the message as nothing outside the system can actually read it.
             */
            sqsManagedSseEnabled: false,
            /**
             * We want to make sure that no message is sent more than once.
             *
             * TODO: determine if the criteria by which will we create a hash for the ID.
             * TODO: must set "MessageDeduplicationId" property when creating the message.
             */
            contentBasedDeduplication: true
        };
        return app.addResource(aws.sqs.Queue, {
            name: createResourceName("sqs"),
            config,
            opts: {
                protect: params.protect,
                provider: params.region.provider
            }
        });
    }
});
