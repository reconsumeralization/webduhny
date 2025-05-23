import { CREATE_MODEL, LIST_MODELS } from "./graphql";
import { CmsMigrator } from "../../CmsMigrator";

export class CmsModelsMigrator {
    private readonly cmsMigrator: CmsMigrator;

    constructor(cmsMigrator: CmsMigrator) {
        this.cmsMigrator = cmsMigrator;
    }

    async run() {
        const { sourceGqlManageClient, targetGqlManageClient } = this.cmsMigrator;
        const sourceListModels = await sourceGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });
        const targetListModels = await targetGqlManageClient.run(LIST_MODELS).then(res => {
            return res.listContentModels;
        });

        if (sourceListModels.data.length === 0) {
            console.log("No models to migrate.");
            return;
        }

        for (const sourceModel of sourceListModels.data) {
            if (sourceModel.plugin) {
                console.log(`Skipping model "${sourceModel.title}" because it is a plugin model.`);
                continue;
            }

            const modelExists = targetListModels.data.find(
                (m: Record<string, any>) => m.modelId === sourceModel.modelId
            );

            if (modelExists) {
                console.log(
                    `Model "${sourceModel.name}" already exists in the target environment.`
                );
                continue;
            }

            console.log(`Migrating model "${sourceModel.title}"...`);

            // Migrate model items.
            const res = await targetGqlManageClient.run(CREATE_MODEL, {
                data: {
                    name: sourceModel.name,
                    singularApiName: sourceModel.singularApiName,
                    pluralApiName: sourceModel.pluralApiName,
                    modelId: sourceModel.modelId,
                    group: {
                        id: sourceModel.group.id,
                        slug: sourceModel.group.slug
                    },
                    icon: sourceModel.icon,
                    description: sourceModel.description,
                    layout: sourceModel.layout,
                    fields: sourceModel.fields.map((field: Record<string, any>) => {
                        return {
                            ...field,
                            multipleValues: field.multipleValues || undefined,
                            predefinedValues: field.predefinedValues || undefined
                        };
                    }),
                    titleFieldId: sourceModel.titleFieldId,
                    descriptionFieldId: sourceModel.descriptionFieldId,
                    imageFieldId: sourceModel.imageFieldId,
                    tags: sourceModel.tags
                }
            });

            const { error } = res.createContentModel;
            if (error) {
                console.log(`Failed to migrate model "${sourceModel.title}". Error:`, error);
            }
        }
    }
}
