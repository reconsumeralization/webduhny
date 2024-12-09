import type { CmsModel } from "@webiny/app-headless-cms/types";
import type { PbEditorElement, PbPageTemplate } from "@webiny/app-page-builder/types";
import { InputBindings } from "~/admin/DataSourceProperties/useInputBinding";

export const mapToDynamicTemplate = <T extends PbPageTemplate>(
    template: T,
    content: PbEditorElement,
    models: CmsModel[]
) => {
    // Get content model.
    const modelId = template.tags.find(tag => tag.startsWith("model:"))!.split(":")[1];
    const templateModel = models.find(model => model.modelId === modelId)!;

    // Get entry id to preview.
    const previewIdTag = template.tags.find(tag => tag.startsWith("preview:"));
    const previewId = previewIdTag ? previewIdTag.split(":")[1] : undefined;

    // Get dynamic data paths.
    const bindings: InputBindings = content.data.bindings || [];

    return { ...template, templateModel, previewId, bindings };
};
