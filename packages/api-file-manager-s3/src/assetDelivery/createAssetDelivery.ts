import { createAssetDeliveryPluginLoader } from "@webiny/api-file-manager";
import { PluginFactory } from "@webiny/plugins/types";
import { createThreatDetectionPluginLoader } from "~/assetDelivery/threatDetection";
import type { AssetDeliveryParams } from "~/assetDelivery/types";

export const createAssetDelivery = (params: AssetDeliveryParams): PluginFactory[] => {
    return [
        /**
         * We only want to load this plugin in the context of the Asset Delivery Lambda function.
         */
        createAssetDeliveryPluginLoader(() => {
            return import(/* webpackChunkName: "s3AssetDelivery" */ "./assetDeliveryConfig").then(
                ({ assetDeliveryConfig }) => assetDeliveryConfig(params)
            );
        }),
        /**
         * We only want to load this plugin in the context of the Threat Detection Lambda function.
         */
        createThreatDetectionPluginLoader(() => {
            return import(
                /* webpackChunkName: "threatDetectionEventHandler" */ "./threatDetection/createThreatDetectionEventHandler"
            ).then(({ createThreatDetectionEventHandler }) => createThreatDetectionEventHandler());
        })
    ];
};
