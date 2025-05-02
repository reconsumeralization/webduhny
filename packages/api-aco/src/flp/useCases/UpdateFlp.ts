import { WebinyError } from "@webiny/error";
import { Permissions } from "./Permissions";
import { ROOT_FOLDER } from "~/constants";
import type { AcoContext, Folder, FolderLevelPermission } from "~/types";

export class UpdateFlp {
    private context: AcoContext;
    private updated: Set<string> = new Set();

    constructor(context: AcoContext, updated?: string[]) {
        this.context = context;
        this.updated = new Set(updated);
    }

    async execute(folder: Folder, original: Folder) {
        try {
            if (!folder || !original) {
                throw new WebinyError(
                    "Missing `data` or `folder`, I can't update the FLP record.",
                    "ERROR_UPDATING_FLP_USE_CASE_FOLDER_NOT_PROVIDED",
                    { folder, original }
                );
            }

            const flp = await this.getFlp(folder.id);
            const parentFlp = folder.parentId ? await this.getFlp(folder.parentId) : null;

            const updatedFlp = await this.context.aco.flp.update(folder.id, {
                parentId: folder.parentId ?? ROOT_FOLDER,
                path: this.getPath(folder.slug, parentFlp?.path),
                permissions: Permissions.create(folder.permissions, parentFlp)
            });

            const children = await this.listDirectChildren(flp);

            for (const child of children) {
                await this.executeRecursive(child, updatedFlp);
            }
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while updating FLP",
                code: "ERROR_UPDATING_FLP_USE_CASE"
            });
        }
    }

    public getUpdated() {
        return Array.from(this.updated);
    }

    private setUpdated(id: string) {
        this.updated.add(id);
    }

    private isUpdated(id: string) {
        return this.updated.has(id);
    }

    private async executeRecursive(
        targetFlp: FolderLevelPermission,
        parentFlp: FolderLevelPermission
    ) {
        if (this.isUpdated(targetFlp.id)) {
            return;
        }

        const updatedTargetFlp = await this.context.aco.flp.update(targetFlp.id, {
            path: this.getPath(targetFlp.slug, parentFlp.path),
            permissions: Permissions.create(targetFlp.permissions, parentFlp)
        });

        this.setUpdated(targetFlp.id);

        const children = await this.listDirectChildren(targetFlp);

        for (const child of children) {
            await this.executeRecursive(child, updatedTargetFlp);
        }

        return;
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
