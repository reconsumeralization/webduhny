import { CmsContext } from "@webiny/api-headless-cms/types";
import { createFilterModel } from "~/filter/filter.model";
import { createFolderModel } from "~/folder/folder.model";
import { createSearchModel } from "~/record/record.model";
import { modelFactory } from "~/utils/modelFactory";
import { FolderCmsModelModifierPlugin } from "~/folder/createFolderModelModifier";

export const createAcoModels = async (context: CmsContext) => {
    /**
     * Create CmsModel plugins.
     */
    const folderModel = createFolderModel();

    const modelModifiers = context.plugins.byType<FolderCmsModelModifierPlugin>(
        FolderCmsModelModifierPlugin.type
    );

    for (const modifier of modelModifiers) {
        await modifier.modifyModel(folderModel);
    }

    const modelDefinitions = [folderModel, createSearchModel(), createFilterModel()];
    const cmsModelPlugins = modelDefinitions.map(modelDefinition => {
        return modelFactory({
            modelDefinition
        });
    });

    /**
     *  Register them so that they are accessible in cms context
     */
    context.plugins.register([cmsModelPlugins]);
};
