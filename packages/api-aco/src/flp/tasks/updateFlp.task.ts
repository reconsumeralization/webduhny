import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import { UPDATE_FLP_TASK_ID } from "~/flp/tasks";
import { Permissions } from "./Permissions";
import { ROOT_FOLDER } from "~/constants";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type FolderLevelPermission,
    type IUpdateFlpTaskInput,
    type IUpdateFlpTaskParams
} from "~/types";

class UpdateFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private permissions: Permissions;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, permissions: Permissions) {
        this.operations = operations;
        this.permissions = permissions;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IUpdateFlpTaskInput>({
            id: UPDATE_FLP_TASK_ID,
            title: "ACO - Update FLP record",
            description:
                "Synchronizes the FLP catalog by updating the FLP record and its descendants based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IUpdateFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    const updated = new Set(input.updated ?? []);
                    const { folder, original } = input;

                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue({ ...input, updated });
                    }

                    if (!folder || !original) {
                        throw new WError(
                            "Missing `data` or `folder`, I can't update the FLP record.",
                            "ERROR_UPDATE_FLP_TASK_FOLDER_NOT_PROVIDED",
                            { folder, original }
                        );
                    }

                    const flp = await this.getFlp(folder.id, folder.type, context);

                    if (!flp) {
                        throw new WError(
                            "Missing `flp`, I can't update the FLP record.",
                            "ERROR_UPDATE_FLP_TASK_CANNOT_GET_FLP_FROM_FOLDER",
                            { folder, original, flp }
                        );
                    }

                    const parentFlp = folder.parentId
                        ? await this.getFlp(folder.parentId, folder.type, context)
                        : null;

                    const updatedFlp = await this.operations.update({
                        data: {
                            ...flp,
                            parentId: folder.parentId ?? ROOT_FOLDER,
                            path: this.getPath(folder.slug, parentFlp?.path),
                            permissions: this.permissions.create(folder.permissions, parentFlp)
                        }
                    });

                    const updateRecursive = async (
                        targetFlp: FolderLevelPermission,
                        parentFlp: FolderLevelPermission
                    ) => {
                        if (isCloseToTimeout()) {
                            return response.continue({ ...input, updated });
                        }

                        if (updated.has(targetFlp.id)) {
                            return;
                        }

                        const updatedTargetFlp = await this.operations.update({
                            data: {
                                ...targetFlp,
                                path: this.getPath(targetFlp.slug, parentFlp.path),
                                permissions: this.permissions.create(
                                    targetFlp.permissions,
                                    parentFlp
                                )
                            },
                            original: targetFlp
                        });

                        updated.add(targetFlp.id);

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

                    return response.done("Task done: FLP record updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private async getDirectChildren(flp: FolderLevelPermission) {
        return await this.operations.listDescendants({
            where: {
                tenant: flp.tenant,
                locale: flp.locale,
                type: flp.type,
                parentId: flp.id
            }
        });
    }

    private async getFlp(id: string, type: string, context: AcoContext) {
        const tenant = this.getTenantId(context);
        const locale = this.getLocaleCode(context);

        return await this.operations.get({
            where: {
                tenant,
                locale,
                type,
                id
            }
        });
    }

    private getTenantId(context: AcoContext) {
        const tenant = context.tenancy.getCurrentTenant();
        if (!tenant) {
            throw new WError("Missing tenant in context.", "ERROR_UPDATE_FLP_TASK_MISSING_TENANT");
        }
        return tenant.id;
    }

    private getLocaleCode(context: AcoContext) {
        const locale = context.i18n.getContentLocale();
        if (!locale) {
            throw new WError(
                "Missing content locale in context.",
                "ERROR_UPDATE_FLP_TASK_MISSING_LOCALE"
            );
        }
        return locale.code;
    }

    private getPath(slug: string, parentPath?: string) {
        if (parentPath) {
            return `${parentPath}/${slug}`;
        }

        return `${ROOT_FOLDER}/${slug}`;
    }
}

interface FlpTasksParams {
    documentClient: DynamoDBDocument;
}

export const updateFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const permissions = new Permissions();
    const task = new UpdateFlpTask(operations, permissions);
    return task.init();
};
