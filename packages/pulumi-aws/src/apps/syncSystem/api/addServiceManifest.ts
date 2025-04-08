import * as pulumi from "@pulumi/pulumi";
import type { PulumiApp } from "@webiny/pulumi";
import type { IGetSyncSystemOutputResult } from "~/apps/syncSystem/types.js";
import {
    addServiceManifestTableItem,
    type TableDefinition
} from "~/utils/addServiceManifestTableItem.js";
import type { CoreOutput } from "~/apps/common/CoreOutput.js";
import { createSyncResourceName } from "~/apps/syncSystem/createSyncResourceName.js";

export interface IAddServiceManifestParams {
    app: PulumiApp;
    syncSystem: IGetSyncSystemOutputResult;
    core: CoreOutput;
}

export const addServiceManifest = (params: IAddServiceManifestParams) => {
    const { app, syncSystem, core } = params;

    const tableItemName = createSyncResourceName("webiny-manifest");

    const table: TableDefinition = {
        tableName: pulumi.output(core.primaryDynamodbTableName),
        hashKey: pulumi.output(core.primaryDynamodbTableHashKey),
        rangeKey: pulumi.output(core.primaryDynamodbTableRangeKey)
    };
    addServiceManifestTableItem(app, table, {
        name: tableItemName,
        manifest: {
            sync: {
                eventBusArn: syncSystem.eventBusArn
            }
        }
    });
};
