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
            let cursor = "";
            while (true) {
                const LIST_ENTRIES_QUERY = createListQuery(model);
                const sourceEntriesList = await sourceGqlManageClient
                    .run(LIST_ENTRIES_QUERY, { limit: 25, after: cursor })
                    .then(res => {
                        return res.content;
                    });

                if (sourceEntriesList.error) {
                    console.log(
                        `Failed to list entries for model "${model.name}". Error:`,
                        sourceEntriesList.error
                    );
                    break;
                }

                if (!sourceEntriesList.data.length) {
                    console.log(`No entries to migrate for model "${model.name}".`);
                    break;
                }

                console.log(`Migrating entries for model "${model.name}"...`);

                const CREATE_ENTRY = createCreateMutation(model);
                for (const sourceEntry of sourceEntriesList.data) {
                    // TODO : already existS?
                    // TODO : latest not published but has published?

                    console.log(`Migrating entry "${sourceEntry.title}"...`);

                    // Migrate entry items.
                    const {
                        id,
                        entryId,
                        savedOn,
                        createdOn,
                        createdBy,
                        modifiedBy,
                        ownedBy,
                        meta,
                        ...fieldsData
                    } = sourceEntry;

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
                            revisionFirstPublishedBy: modifiedBy,
                            revisionLastPublishedBy: modifiedBy,
                            firstPublishedOn: meta.publishedOn,
                            lastPublishedOn: meta.publishedOn,
                            firstPublishedBy: modifiedBy,
                            lastPublishedBy: modifiedBy
                        });
                    }

                    const variables = {
                        data: {
                            id: entryId,
                            ...fieldsData,
                            ...cmsMetaFields,
                            ...publishingMetaFields
                        }
                    };

                    const res = await targetGqlManageClient.run(CREATE_ENTRY, variables);

                    const { error } = res.content;
                    if (error) {
                        console.log(
                            `Failed to migrate entry "${sourceEntry.title}". Error:`,
                            error
                        );
                    }
                }

                if (sourceEntriesList.meta.hasMoreItems) {
                    cursor = sourceEntriesList.meta.cursor;
                } else {
                    console.log(`No more items to migrate for model "${model.name}".`);
                    break;
                }
            }
        }
    }
}
