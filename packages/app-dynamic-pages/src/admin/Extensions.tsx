import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { PageTemplateDialog } from "~/admin/PageTemplateDialog/PageTemplateDialog";
import { DynamicTemplateEditorConfig } from "~/admin/templateEditor/DynamicTemplateEditorConfig";
import { AddPreviewPane } from "~/admin/ContentEntryForm/AddPreviewPane";
import { PassEntryToDataSource } from "~/admin/ContentEntryForm/PassEntryToDataSource";
import { DynamicElementRenderers } from "~/dataInjection/renderers/DynamicElementRenderers";
import { WebsiteDataInjection } from "~/dataInjection/presets/WebsiteDataInjection";
import { PageTemplatesPreview } from "~/admin/PageTemplatesPreview";
import { Elements } from "~/admin/elements/Elements";
import { DynamicPageEditorConfig } from "~/admin/pageEditor/DynamicPageEditorConfig";
import { PagesPreview } from "~/admin/PagesPreview";

export const Extensions = () => {
    return (
        <>
            {/* Register editor elements plugins. */}
            <Elements />

            {/* Decorate page template dialog. */}
            <PageTemplateDialog />

            {/* Decorate page template content preview. */}
            <PageTemplatesPreview />

            {/* Decorate page content preview. */}
            <PagesPreview />

            {/* Configure Template editor. */}
            <DynamicTemplateEditorConfig />

            {/* Configure Page editor. */}
            <DynamicPageEditorConfig />

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
