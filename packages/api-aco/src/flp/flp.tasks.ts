import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createPrivateTaskDefinition } from "@webiny/tasks";
import { createFlpOperations } from "~/flp/flp.so";
import {
    type AcoContext,
    type AcoFolderLevelPermissionsStorageOperations,
    CatalogManagerAction,
    type Folder,
    type ICatalogManagerInput,
    type ICatalogManagerTaskParams
} from "~/types";
import { ROOT_FOLDER } from "~/constants";
import WError from "@webiny/error";
import { CreateFlp, DeleteFlp, UpdateFlp } from "~/flp/useCases";

export const CATALOG_MANAGER_TASK_ID = "acoFlpCatalogManager";

class CatalogManagerTask {
    private operations: AcoFolderLevelPermissionsStorageOperations;
    private create: CreateFlp;
    private delete: DeleteFlp;
    private update: UpdateFlp;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
        this.create = new CreateFlp(operations);
        this.delete = new DeleteFlp(operations);
        this.update = new UpdateFlp(operations);
    }

    public init = () => {
        return createPrivateTaskDefinition<AcoContext, ICatalogManagerInput>({
            id: CATALOG_MANAGER_TASK_ID,
            title: "ACO - Handle FLP catalog",
            description:
                "Keeps the FLP catalog in sync by handling folder creation, updates (e.g., parent changes), and deletions.",
            disableDatabaseLogs: true,
            run: async (params: ICatalogManagerTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue(input);
                    }

                    const data = await this.getFlpFields(input.data, context);

                    switch (input.action) {
                        case CatalogManagerAction.CREATE:
                            await this.create.execute(data);
                            break;

                        case CatalogManagerAction.UPDATE:
                            if (!input.original) {
                                throw new WError(
                                    "Missing `input.original` field, I can't update the FLP catalog.",
                                    "ERROR_FLP_CATALOG_MANAGER_TASK"
                                );
                            }
                            const original = await this.getFlpFields(input.original, context);
                            await this.update.execute(data, original);
                            break;

                        case CatalogManagerAction.DELETE:
                            await this.delete.execute(data);
                            break;

                        default:
                            throw new WError(
                                "Unexpected `input.action` provided, I can't update the FLP catalog.",
                                "ERROR_FLP_CATALOG_MANAGER_TASK",
                                {
                                    input
                                }
                            );
                    }

                    return response.done("Task done: FLP catalog updated.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };

    private getFlpFields = async (data: Folder, context: AcoContext) => {
        const tenant = context.tenancy.getCurrentTenant().id;
        const locale = context.i18n.getContentLocale()!.code;
        const { parentId, id, type, slug, permissions = [] } = data;

        let path = `${ROOT_FOLDER}/${slug}`;

        if (parentId) {
            const parent = await this.operations.get({
                where: { tenant, locale, type, id: parentId }
            });

            if (!parent) {
                throw new WError(
                    `Cannot find parent FLP record with id ${parentId}.`,
                    "ERROR_FLP_CATALOG_MANAGER_TASK"
                );
            }

            path = `${parent.path}/${slug}`;
        }

        return {
            tenant,
            locale,
            id,
            parentId: parentId ?? ROOT_FOLDER,
            type,
            slug,
            path,
            permissions
        };
    };
}

interface FlpTasksParams {
    documentClient: DynamoDBDocument;
}

export const flpTasks = (params: FlpTasksParams) => {
    const operations = createFlpOperations(params);
    const task = new CatalogManagerTask(operations);
    return task.init();
};
