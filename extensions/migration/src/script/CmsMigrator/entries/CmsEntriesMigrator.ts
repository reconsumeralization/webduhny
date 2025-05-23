import { createCreateMutation, createListQuery } from "./graphql";
import { LIST_MODELS } from "../models/graphql";
import { CmsMigrator } from "../../CmsMigrator";

export class CmsEntriesMigrator {
    private readonly cmsMigrator: CmsMigrator;

    constructor(cmsMigrator: CmsMigrator) {
        this.cmsMigrator = cmsMigrator;
    }

    async run() {
        const { sourceGqlManageClient, targetGqlManageClient } = this.cmsMigrator;
        const sourceListModels = await sourceGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });

        for (const model of sourceListModels.data) {
            const LIST_ENTRIES = createListQuery(model);

            const sourceEntriesList = await sourceGqlManageClient.run(LIST_ENTRIES).then(res => {
                return res.content;
            });

            if (sourceEntriesList.error) {
                console.log(
                    `Failed to list entries for model "${model.name}". Error:`,
                    sourceEntriesList.error
                );
                continue;
            }

            if (!sourceEntriesList.data.length) {
                console.log(`No entries to migrate for model "${model.name}".`);
                continue;
            }

            console.log(`Migrating entries for model "${model.name}"...`);

            const CREATE_ENTRY = createCreateMutation(model);
            for (const sourceEntry of sourceEntriesList.data) {
                // TODO : already existS?

                console.log(`Migrating entry "${sourceEntry.title}"...`);

                // Migrate entry items.
                const { id, entryId, savedOn, createdOn, createdBy, ownedBy, meta, ...fieldsData } =
                    sourceEntry;

                const cmsMetaFields = {
                    createdOn: createdOn,
                    modifiedOn: savedOn,
                    savedOn: savedOn,
                    createdBy: ownedBy,
                    modifiedBy: ownedBy,
                    savedBy: ownedBy,
                    revisionCreatedOn: createdOn,
                    revisionModifiedOn: savedOn,
                    revisionSavedOn: savedOn,
                    revisionCreatedBy: ownedBy,
                    revisionModifiedBy: ownedBy,
                    revisionSavedBy: ownedBy
                };

                const publishingMetaFields: Record<string, any> = { status: meta.status };
                if (meta.publishedOn) {
                    Object.assign(publishingMetaFields, {
                        revisionFirstPublishedOn: meta.publishedOn,
                        revisionLastPublishedOn: meta.publishedOn,
                        revisionFirstPublishedBy: meta.publishedOn,
                        revisionLastPublishedBy: meta.publishedOn,
                        firstPublishedOn: meta.publishedOn,
                        lastPublishedOn: meta.publishedOn,
                        firstPublishedBy: meta.publishedOn,
                        lastPublishedBy: meta.publishedOn
                    });
                }

                const variables = {
                    data: {
                        id,
                        ...fieldsData,
                        ...cmsMetaFields,
                        ...publishingMetaFields
                    }
                };

                const res = await targetGqlManageClient.run(CREATE_ENTRY, variables);

                const { error } = res.createContentEntry;
                if (error) {
                    console.log(`Failed to migrate entry "${sourceEntry.title}". Error:`, error);
                }
            }

            if (!sourceEntriesList.meta.hasMoreItems) {
                console.log(`No more items to migrate for model "${model.name}".`);
                continue;
            }

            // const targetListEntries = await targetGqlManageClient.run(LIST_ENTRIES).then(res => {
            //     return res.listContentEntries;
            // });
            //
            // if (sourceListEntries.data.length === 0) {
            //     console.log("No entries to migrate.");
            //     return;
            // }
            //
            // for (const sourceEntry of sourceListEntries.data) {
            //     if (sourceEntry.plugin) {
            //         console.log(`Skipping entry "${sourceEntry.title}" because it is a plugin entry.`);
            //         continue;
            //     }
            //
            //     const entryExists = targetListEntries.data.find(
            //         (m: Record<string, any>) => m.slug === sourceEntry.slug
            //     );
            //
            //     if (entryExists) {
            //         console.log(
            //             `Entry "${sourceEntry.name}" already exists in the target environment.`
            //         );
            //         continue;
            //     }
            //
            //     console.log(`Migrating entry "${sourceEntry.title}"...`);
            //
            //     // Migrate entry items.
            //     const res = await targetGqlManageClient.run(CREATE_ENTRY, {
            //         data: {
            //             name: sourceEntry.name,
            //             singularApiName: sourceEntry.singularApiName,
            //             pluralApiName: sourceEntry.pluralApiName,
            //             entryId: sourceEntry.entryId,
            //             group: {
            //                 id: sourceEntry.group.id,
            //                 slug: sourceEntry.group.slug
            //             },
            //             icon: sourceEntry.icon,
            //             description: sourceEntry.description,
            //             layout: sourceEntry.layout,
            //             fields: sourceEntry.fields.map((field: Record<string, any>) => {
            //                 return {
            //                     ...field,
            //                     multipleValues: field.multipleValues || undefined,
            //                     predefinedValues: field.predefinedValues || undefined
            //                 };
            //             }),
            //             titleFieldId: sourceEntry.titleFieldId,
            //             descriptionFieldId: sourceEntry.descriptionFieldId,
            //             imageFieldId: sourceEntry.imageFieldId,
            //             tags: sourceEntry.tags
            //         }
            //     });
            //
            //     const { error } = res.createContentEntry;
            //     if (error) {
            //         console.log(`Failed to migrate entry "${sourceEntry.title}". Error:`, error);
            //     }
            // }
        }
    }
}
