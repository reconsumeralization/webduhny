import { WebinyError } from "@webiny/error";
import { Permissions } from "./Permissions";
import { ROOT_FOLDER } from "~/constants";
import type { AcoContext, Folder, FolderLevelPermission } from "~/types";

interface UpdateFlpParams {
    context: AcoContext;
    updated?: string[];
    isCloseToTimeout?: () => boolean;
    handleTimeout?: (updated: string[]) => void;
}

export class UpdateFlp {
    private context: AcoContext;
    private readonly updated: Set<string> = new Set();
    private readonly isCloseToTimeout?: () => boolean;
    private readonly handleTimeout?: (updated: string[]) => void;

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

            // Update the current folder
            const updatedFlp = await this.context.aco.flp.update(folder.id, {
                slug: folder.slug,
                parentId: folder.parentId ?? ROOT_FOLDER,
                path: this.getPath(folder.slug, parentFlp?.path),
                permissions: Permissions.create(folder.permissions, parentFlp)
            });

            this.setUpdated(folder.id);

            // Get direct children and process each branch completely
            const directChildren = await this.listDirectChildren(flp);
            for (const child of directChildren) {
                if (this.isCloseToTimeout?.()) {
                    this.handleTimeout?.(this.getUpdated());
                    return;
                }
                await this.processBranch(child, updatedFlp);
            }
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while updating FLP",
                code: "ERROR_UPDATING_FLP_USE_CASE"
            });
        }
    }

    private async processBranch(flp: FolderLevelPermission, parentFlp: FolderLevelPermission) {
        if (this.isUpdated(flp.id)) {
            return;
        }

        const updated = await this.context.aco.flp.update(flp.id, {
            path: this.getPath(flp.slug, parentFlp.path),
            permissions: Permissions.create(flp.permissions, parentFlp)
        });

        this.setUpdated(flp.id);

        // Process all children of this folder before moving to siblings
        const children = await this.listDirectChildren(flp);
        for (const child of children) {
            if (this.isCloseToTimeout?.()) {
                this.handleTimeout?.(this.getUpdated());
                return;
            }
            await this.processBranch(child, updated);
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
