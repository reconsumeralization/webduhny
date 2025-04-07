import * as aws from "@pulumi/aws";
import type { QueueArgs } from "@pulumi/aws/sqs";
import type { PulumiApp } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createSyncResourceName } from "./createSyncResourceName.js";

export const SyncSystemSQS = createAppModule({
    name: "SyncSystemSQS",
    config: (app: PulumiApp) => {
        const config: QueueArgs = {
            delaySeconds: 0,
            /**
             * 5 minutes should be enough for the message to be processed.
             */
            visibilityTimeoutSeconds: 900,
            fifoQueue: true,
            receiveWaitTimeSeconds: 0,
            deduplicationScope: "queue",
            /**
             * The maximum message size is 256 KB.
             * Chunks are billed in 64KB increments, so let's keep the message size below that.
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
            name: createSyncResourceName("sqs"),
            config
        });
    }
});
