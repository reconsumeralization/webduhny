import * as aws from "@pulumi/aws";
import type { BucketArgs } from "@pulumi/aws/s3";
import type { PulumiApp } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";
import { createResourceName } from "./createResourceName.js";
import type { RegionProvider } from "./types.js";

export interface ISyncSystemS3Params {
    region: RegionProvider;
    protect: boolean;
}

export const SyncSystemS3 = createAppModule({
    name: "SyncSystemS3",
    config: (app: PulumiApp, params: ISyncSystemS3Params) => {
        const config: BucketArgs = {
            forceDestroy: !params.protect,
            acl: aws.s3.CannedAcl.Private
        };
        const resourceName = createResourceName("s3");
        const bucket = app.addResource(aws.s3.Bucket, {
            name: resourceName,
            config,
            opts: {
                provider: params.region.provider,
                protect: params.protect
            }
        });
        /**
         * Block any public access to sync system s3 bucket.
         */
        app.addResource(aws.s3.BucketPublicAccessBlock, {
            name: `${resourceName}-block-public-access`,
            config: {
                bucket: bucket.output.id,
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true
            }
        });
        return bucket;
    }
});
