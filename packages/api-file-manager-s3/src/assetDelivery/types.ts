import { createAssetDelivery as createBaseAssetDelivery } from "@webiny/api-file-manager";

export type AssetDeliveryParams = Parameters<typeof createBaseAssetDelivery>[0] & {
    imageResizeWidths?: number[];
    /**
     * BE CAREFUL!
     * Setting this to more than 1 hour may cause your URLs to still expire before the desired expiration time.
     * @see https://repost.aws/knowledge-center/presigned-url-s3-bucket-expiration
     */
    presignedUrlTtl?: number;
    assetStreamingMaxSize?: number;
};
