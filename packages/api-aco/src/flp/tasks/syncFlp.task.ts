import { createTaskDefinition } from "@webiny/tasks";
import { SYNC_FLP_TASK_ID, UPDATE_FLP_TASK_ID } from "~/flp/tasks";
import {
    type AcoContext,
    type ISyncFlpTaskInput,
    type ISyncFlpTaskParams,
    type IUpdateFlpTaskInput
} from "~/types";
import { PB_PAGE_TYPE, FM_FILE_TYPE } from "~/constants";

class SyncFlpTask {
    public init = () => {
        return createTaskDefinition<AcoContext, ISyncFlpTaskInput>({
            id: SYNC_FLP_TASK_ID,
            title: "ACO - Sync FLP record",
            description:
                "Synchronizes the FLP catalog by updating the FLP record and its descendants.",
            disableDatabaseLogs: true,
            run: async (params: ISyncFlpTaskParams) => {
                const { response, isAborted, input, context, store } = params;
                try {
                    if (isAborted()) {
                        return response.aborted();
                    }

                    /**
                     * `folderId` provided in the task input. We need to:
                     *
                     * - update the FLP records for the found folder and all its descendants.
                     */
                    if (input.folderId) {
                        const folder = await context.aco.folder.get(input.folderId, true);
                        await context.tasks.trigger<IUpdateFlpTaskInput>({
                            definition: UPDATE_FLP_TASK_ID,
                            input: {
                                folder
                            }
                        });

                        return response.done(
                            `Task completed successfully: all FLP records for folderId "${input.folderId}" and its children have been queued to be synchronized.`
                        );
                    }

                    /**
                     * `type` provided in the task input. We need to:
                     *
                     * - list all root folders for the provided type
                     * - update the FLP records for the found folders and all its descendants.
                     */
                    if (input.type) {
                        const [folders] = await context.aco.folder.list({
                            where: {
                                type: input.type,
                                parentId: null
                            },
                            disablePermissions: true
                        });

                        for (const folder of folders) {
                            await context.tasks.trigger<IUpdateFlpTaskInput>({
                                definition: UPDATE_FLP_TASK_ID,
                                input: {
                                    folder
                                }
                            });
                        }

                        return response.done(
                            `Task completed successfully: all FLP records for type "${input.type}" have been queued to be synchronized.`
                        );
                    }

                    /**
                     *  Full update required: Neither type nor folderId were provided. We need to:
                     *
                     *  - iterate through all the tenants
                     *  - iterate through all the locales in the tenant
                     *  - list cms models to collect their types, together with the default ones [PB_PAGE_TYPE, FM_FILE_TYPE]
                     *  - list all root folders
                     *  - update the FLP records for the found folders and all its descendants.
                     */
                    const tenants = await context.tenancy.listTenants();
                    await context.tenancy.withEachTenant(tenants, async tenant => {
                        // Reloading locales for the current tenant to ensure the correct data is available before proceeding.
                        await context.i18n.reloadLocales();

                        // Fetch all locales for the tenant.
                        const locales = context.i18n.getLocales();

                        await context.i18n.withEachLocale(locales, async locale => {
                            // Some folder types are fixed: pages and files.
                            const folderTypes = [PB_PAGE_TYPE, FM_FILE_TYPE];

                            // List all non-private models for the current locale.
                            const models = await context.security.withoutAuthorization(
                                async () => await context.cms.listModels({ includePrivate: false })
                            );

                            for (const model of models) {
                                folderTypes.push(`cms:${model.modelId}`);
                            }

                            for (const folderType of folderTypes) {
                                const [folders] = await context.aco.folder.list({
                                    where: {
                                        type: folderType,
                                        parentId: null
                                    },
                                    disablePermissions: true
                                });

                                for (const folder of folders) {
                                    await context.tasks.trigger<IUpdateFlpTaskInput>({
                                        definition: UPDATE_FLP_TASK_ID,
                                        input: {
                                            folder
                                        }
                                    });
                                }

                                await store.addInfoLog({
                                    message: `FLP Update task triggered for TYPE: ${folderType} / TENANT: ${tenant.name} / LOCALE: ${locale.code}`,
                                    data: {
                                        tenant: tenant.id,
                                        locale: locale.code,
                                        type: folderType
                                    }
                                });
                            }
                        });
                    });

                    return response.done(
                        `Task completed successfully: all FLP records have been queued to be synchronized.`
                    );
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };
}

export const syncFlpTask = () => {
    const task = new SyncFlpTask();
    return task.init();
};
