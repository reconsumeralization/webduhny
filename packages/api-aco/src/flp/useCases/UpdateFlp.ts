import type {
    AcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission
} from "~/flp/flp.types";
import WError from "@webiny/error";

export class UpdateFlp {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private updated: Set<string>;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
        this.updated = new Set();
    }

    public async execute(data: FolderLevelPermission, original: FolderLevelPermission) {
        if (!data || !original) {
            throw new WError(
                "Missing `data` or `original` data for updating FLP catalog.",
                "ERROR_FLP_CATALOG_EXECUTE",
                { data, original }
            );
        }

        await this.operations.update({ data, original });

        const children = await this.getDirectChildren(original);

        for (const child of children) {
            await this.propagateUpdate(child);
        }
    }

    private async propagateUpdate(flp: FolderLevelPermission): Promise<void> {
        if (this.updated.has(flp.id)) {
            return;
        }

        this.updated.add(flp.id);
        await this.updateFlp(flp);

        const children = await this.getDirectChildren(flp);

        for (const child of children) {
            await this.propagateUpdate(child);
        }
    }

    private async updateFlp(flp: FolderLevelPermission): Promise<void> {
        const parent = await this.operations.get({
            where: {
                tenant: flp.tenant,
                locale: flp.locale,
                type: flp.type,
                id: flp.parentId
            }
        });

        if (!parent) {
            throw new WError(
                `Parent FLP record not found for node ${flp.id} with parentId ${flp.parentId}.`,
                "ERROR_FLP_PARENT_NOT_FOUND"
            );
        }

        console.log("update", `${parent.path}/${flp.slug}`);

        await this.operations.update({
            data: {
                ...flp,
                path: `${parent.path}/${flp.slug}`
            }
        });
    }

    private async getDirectChildren(flp: FolderLevelPermission) {
        const children = await this.operations.list({
            where: {
                tenant: flp.tenant,
                locale: flp.locale,
                type: flp.type,
                path_startsWith: `${flp.path}/`
            }
        });

        return children.filter(child => child.parentId === flp.id);
    }
}
