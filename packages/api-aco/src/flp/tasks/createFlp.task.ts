import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import WError from "@webiny/error";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import { CREATE_FLP_TASK_ID } from "~/flp/tasks";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    type FolderLevelPermission as IFolderLevelPermission,
    type ICreateFlpTaskInput,
    type ICreateFlpTaskParams
} from "~/types";
import { ROOT_FOLDER } from "~/constants";
import { Permissions } from "./Permissions";

class CreateFlpTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private permissions: Permissions;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations, permissions: Permissions) {
        this.operations = operations;
        this.permissions = permissions;
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, ICreateFlpTaskInput>({
            id: CREATE_FLP_TASK_ID,
            title: "ACO - Create FLP record",
            description:
                "Synchronizes the FLP catalog by creating the FLP record based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: ICreateFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue(input);
                    }

                    const { folder } = input;

                    if (!folder) {
                        throw new WError(
                            "Missing `folder`, I can't create a new record into the FLP catalog.",
                            "ERROR_CREATE_FLP_TASK_FOLDER_NOT_PROVIDED"
                        );
                    }

                    const tenant = this.getTenantId(context);
                    const locale = this.getLocaleCode(context);
                    const { id, type, slug, parentId, permissions } = folder;
                    let parentFlp: IFolderLevelPermission | undefined = undefined;

                    if (parentId) {
                        const parent = await this.operations.get({
                            where: {
                                tenant,
                                locale,
                                type,
                                id: parentId
                            }
                        });

                        if (!parent) {
                            throw new WError(
                                `Cannot find parent FLP record with id ${parentId}.`,
                                "ERROR_CREATE_FLP_TASK_CANNOT_GET_PARENT_FLP_FROM_FOLDER",
                                input
                            );
                        }

                        parentFlp = parent;
                    }

                    await this.operations.create({
                        data: {
                            tenant,
                            locale,
                            id,
                            type,
                            slug,
                            parentId: parentId ?? ROOT_FOLDER,
                            path: this.getPath(slug, parentFlp?.path),
                            permissions: this.permissions.create(permissions, parentFlp)
                        }
                    });

                    return response.done("Task done: FLP record created.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private getTenantId(context: AcoContext) {
        const tenant = context.tenancy.getCurrentTenant();
        if (!tenant) {
            throw new WError("Missing tenant in context.", "ERROR_CREATE_FLP_TASK_MISSING_TENANT");
        }
        return tenant.id;
    }

    private getLocaleCode(context: AcoContext) {
        const locale = context.i18n.getContentLocale();
        if (!locale) {
            throw new WError(
                "Missing content locale in context.",
                "ERROR_CREATE_FLP_TASK_MISSING_LOCALE"
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

export const createFlpTask = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const permissions = new Permissions();
    const task = new CreateFlpTask(operations, permissions);
    return task.init();
};
