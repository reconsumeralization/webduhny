import type { AcoContext, Folder, FolderLevelPermission } from "~/types";
import { WebinyError } from "@webiny/error";
import { ROOT_FOLDER } from "~/constants";
import { Permissions } from "~/flp/tasks/Permissions";

export class UpdateFlp {
    private context: AcoContext;
    private updated: Set<string> = new Set();

    constructor(context: AcoContext) {
        this.context = context;
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

            const updateRecursive = async (
                targetFlp: FolderLevelPermission,
                parentFlp: FolderLevelPermission
            ) => {
                if (this.updated.has(targetFlp.id)) {
                    return;
                }

                const updatedTargetFlp = await this.context.aco.flp.update(targetFlp.id, {
                    path: this.getPath(targetFlp.slug, parentFlp.path),
                    permissions: Permissions.create(targetFlp.permissions, parentFlp)
                });

                this.updated.add(targetFlp.id);

                const children = await this.getDirectChildren(targetFlp);

                for (const child of children) {
                    await updateRecursive(child, updatedTargetFlp);
                }

                return;
            };

            const children = await this.getDirectChildren(flp);

            for (const child of children) {
                await updateRecursive(child, updatedFlp);
            }
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while updating FLP",
                code: "ERROR_UPDATING_FLP_USE_CASE"
            });
        }
    }

    private async getFlp(id: string) {
        return await this.context.aco.flp.get(id);
    }

    private async getDirectChildren(flp: FolderLevelPermission) {
        return await this.context.aco.flp.list({
            where: {
                type: flp.type,
                parentId: flp.id
            }
        });
    }

    private getPath(slug: string, parentPath?: string) {
        if (parentPath) {
            return `${parentPath}/${slug}`;
        }

        return `${ROOT_FOLDER}/${slug}`;
    }
}
