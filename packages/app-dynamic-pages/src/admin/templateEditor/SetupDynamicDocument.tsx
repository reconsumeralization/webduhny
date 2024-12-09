import React from "react";
import { useTemplate, TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";
import { DynamicDocumentProvider } from "~/dataInjection";

const { Ui } = TemplateEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function TemplateToDynamicDocument() {
        const [template] = useTemplate();

        return (
            <DynamicDocumentProvider
                dataSources={template.dataSources}
                dataBindings={template.dataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
