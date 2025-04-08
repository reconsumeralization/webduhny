import { getSyncSystemOutput } from "~/apps/syncSystem/getSyncSystemOutput.js";
import { attachEventBusPermissions } from "./attachEventBusPermissions.js";
import { attachDynamoDbPermissions } from "~/apps/syncSystem/api/attachDynamoDbPermissions.js";
import { attachS3Permissions } from "~/apps/syncSystem/api/attachS3Permissions.js";
import { addServiceManifest } from "~/apps/syncSystem/api/addServiceManifest.js";
import type { PulumiApp } from "@webiny/pulumi/types";
import type { CoreOutput } from "~/apps/common/CoreOutput.js";

export interface IAttachSyncSystemParams {
    app: PulumiApp;
    env: string;
    core: CoreOutput;
}

export const attachSyncSystem = (params: IAttachSyncSystemParams) => {
    const { app, core, env } = params;

    const syncSystem = getSyncSystemOutput({
        env
    });
    /**
     * Possibly no sync system deployed - no need to do anything at that point.
     * At this point, if sync system was deployed, and it is not anymore, all resources after this check will disappear.
     */
    if (!syncSystem) {
        return;
    }
    /**
     * Permissions for Webiny system to access Sync System resources.
     */
    attachEventBusPermissions({
        app,
        syncSystem
    });
    /**
     * Permissions for Sync System to access Webiny system resources.
     */
    attachDynamoDbPermissions({
        app,
        syncSystem,
        core
    });
    attachS3Permissions({
        app,
        syncSystem,
        core
    });
    /**
     * Add the Service Manifest item to the Webiny system.
     */
    addServiceManifest({
        app,
        syncSystem,
        core
    });
};
