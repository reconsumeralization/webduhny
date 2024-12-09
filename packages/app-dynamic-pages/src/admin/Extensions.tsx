import React from "react";
import { PageTemplateDialog } from "~/admin/PageTemplateDialog/PageTemplateDialog";
import { DynamicTemplateEditorConfig } from "~/admin/templateEditor/DynamicTemplateEditorConfig";
import { AddPreviewPane } from "~/admin/ContentEntryForm/AddPreviewPane";
import { PassEntryToDataSource } from "~/admin/ContentEntryForm/PassEntryToDataSource";
import { DynamicElementRenderers } from "~/dataInjection/renderers/DynamicElementRenderers";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { WebsiteDataInjection } from "~/dataInjection/presets/WebsiteDataInjection";
import { PageTemplatesPreview } from "~/admin/PageTemplatesPreview";

export const Extensions = () => {
    return (
        <>
            {/* Decorate page template dialog. */}
            <PageTemplateDialog />

            {/* Decorate page template content preview. */}
            <PageTemplatesPreview />

            {/* Configure Template editor. */}
            <DynamicTemplateEditorConfig />

            {/* Enable live preview in the CMS entry form. */}
            <AddPreviewPane />
            <PassEntryToDataSource />

            {/* Register element renderers and decorators. */}
            <DynamicElementRenderers />

            {/* Setup data injection for live preview, as if this was a regular website. */}
            <ContentEntryEditorConfig>
                <WebsiteDataInjection />
            </ContentEntryEditorConfig>
        </>
    );
};
