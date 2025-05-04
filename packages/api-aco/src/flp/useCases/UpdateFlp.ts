import { WebinyError } from "@webiny/error";
import { Permissions } from "./Permissions";
import { ROOT_FOLDER } from "~/constants";
import type { AcoContext, Folder, FolderLevelPermission, FolderPermission } from "~/types";

interface UpdateFlpParams {
    context: AcoContext;
    updated?: string[];
    isCloseToTimeout?: () => boolean;
    handleTimeout?: (updated: string[]) => void;
}

interface FlpUpdateData {
    parentId: string;
    slug: string;
    path: string;
    permissions: FolderPermission[];
}

export class UpdateFlp {
    private context: AcoContext;
    private readonly isCloseToTimeout?: () => boolean;
    private readonly handleTimeout?: (updated: string[]) => void;

    private readonly updated: Set<string> = new Set();
    private readonly flpsToUpdate: Map<string, FlpUpdateData> = new Map();

    constructor(params: UpdateFlpParams) {
        this.context = params.context;
        this.updated = new Set(params.updated);
        this.isCloseToTimeout = params.isCloseToTimeout;
        this.handleTimeout = params.handleTimeout;
    }

    async execute(folder: Folder) {
        try {
            if (!folder) {
                throw new WebinyError(
                    "Missing `folder`, I can't update the FLP record.",
                    "ERROR_UPDATING_FLP_USE_CASE_FOLDER_NOT_PROVIDED",
                    { folder }
                );
            }

            const flp = await this.getFlp(folder.id);
            const parentFlp = folder.parentId ? await this.getFlp(folder.parentId) : null;

            // Add the root folder to the update collection
            this.flpsToUpdate.set(folder.id, {
                slug: folder.slug,
                parentId: folder.parentId ?? ROOT_FOLDER,
                path: this.getPath(folder.slug, parentFlp?.path),
                permissions: Permissions.create(folder.permissions, parentFlp)
            });

            // Get direct children and process each branch completely
            const directChildren = await this.listDirectChildren(flp);
            for (const child of directChildren) {
                if (this.isCloseToTimeout?.()) {
                    this.handleTimeout?.(this.getUpdated());
                    return;
                }
                await this.collectBranchForUpdate(child, flp);
            }

            // Execute batch update
            await this.executeBatchUpdate();
        } catch (error) {
            // Clear the update collection in case of error
            this.flpsToUpdate.clear();
            throw WebinyError.from(error, {
                message: "Error while updating FLP",
                code: "ERROR_UPDATING_FLP_USE_CASE"
            });
        }
    }

    private async collectBranchForUpdate(
        flp: FolderLevelPermission,
        parentFlp: FolderLevelPermission
    ) {
        if (this.isUpdated(flp.id)) {
            return;
        }

        // Get the parent's permissions from the update collection if available
        const parentUpdateData = this.flpsToUpdate.get(parentFlp.id);
        const currentParentFlp = parentUpdateData
            ? {
                  ...parentFlp,
                  parentId: parentUpdateData.parentId,
                  slug: parentUpdateData.slug,
                  path: parentUpdateData.path,
                  permissions: parentUpdateData.permissions
              }
            : parentFlp;

        // Add the FLP to the update collection with inherited permissions
        this.flpsToUpdate.set(flp.id, {
            slug: flp.slug,
            parentId: flp.parentId,
            path: this.getPath(flp.slug, currentParentFlp.path),
            permissions: Permissions.create(flp.permissions, currentParentFlp)
        });

        this.setUpdated(flp.id);

        // Process all children of this folder before moving to siblings
        const children = await this.listDirectChildren(flp);
        for (const child of children) {
            if (this.isCloseToTimeout?.()) {
                this.handleTimeout?.(this.getUpdated());
                return;
            }
            // Pass the current FLP as the parent for the child
            await this.collectBranchForUpdate(child, flp);
        }
    }

    private async executeBatchUpdate() {
        try {
            const items = Array.from(this.flpsToUpdate.entries()).map(
                ([id, { slug, parentId, path, permissions }]) => {
                    return {
                        id,
                        data: {
                            slug,
                            parentId,
                            path,
                            permissions
                        }
                    };
                }
            );

            await this.context.aco.flp.batchUpdate(items);
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing batch update of FLPs",
                code: "BATCH_UPDATE_FLP_ERROR",
                data: {
                    items: Array.from(this.flpsToUpdate.keys())
                }
            });
        } finally {
            // Clear the update collection after the batch update
            this.flpsToUpdate.clear();
        }
    }

    private getUpdated() {
        return Array.from(this.updated);
    }

    private setUpdated(id: string) {
        this.updated.add(id);
    }

    private isUpdated(id: string) {
        return this.updated.has(id);
    }

    private async listDirectChildren(flp: FolderLevelPermission) {
        return await this.context.aco.flp.list({
            where: {
                type: flp.type,
                parentId: flp.id
            }
        });
    }

    private async getFlp(id: string) {
        return await this.context.aco.flp.get(id);
    }

    private getPath(slug: string, parentPath?: string) {
        if (parentPath) {
            return `${parentPath}/${slug}`;
        }

        return `${ROOT_FOLDER}/${slug}`;
    }
}
