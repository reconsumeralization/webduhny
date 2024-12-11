import React from "react";
import { PageEditorConfig } from "@webiny/app-page-builder/pageEditor";
import { DynamicDocumentProvider } from "~/dataInjection";
import { usePage } from "@webiny/app-page-builder/pageEditor";
import {
    PbPageTemplateDataBinding,
    PbPageTemplateDataSource
} from "@webiny/app-page-builder/types";

const { Ui } = PageEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function PageToDynamicDocument() {
        const [page, updatePage] = usePage();

        const onDataSources = (dataSources: PbPageTemplateDataSource[]) => {
            updatePage(page => ({ ...page, dataSources }));
        };

        const onDataBindings = (dataBindings: PbPageTemplateDataBinding[]) => {
            updatePage(page => ({ ...page, dataBindings }));
        };

        return (
            <DynamicDocumentProvider
                dataSources={page.dataSources || []}
                dataBindings={page.dataBindings || []}
                onDataSources={onDataSources}
                onDataBindings={onDataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
