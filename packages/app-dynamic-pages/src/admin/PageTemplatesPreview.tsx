import React from "react";
import { PageTemplateContentPreview } from "@webiny/app-page-builder/admin/views/PageTemplates/PageTemplateContentPreview";
import { DataSourceProvider, DynamicDocumentProvider } from "~/dataInjection";
import { WebsiteDataInjection } from "~/dataInjection/presets/WebsiteDataInjection";

export const PageTemplatesPreview = PageTemplateContentPreview.createDecorator(Original => {
    return function PreviewWithDynamicData(props) {
        const { template } = props;

        const mainDataSource = template.dataSources.find(ds => ds.name === "main");

        return (
            <>
                <WebsiteDataInjection />
                <DynamicDocumentProvider
                    dataSources={template.dataSources}
                    dataBindings={template.dataBindings}
                >
                    <DataSourceProvider dataSource={mainDataSource!}>
                        <Original {...props} />
                    </DataSourceProvider>
                </DynamicDocumentProvider>
            </>
        );
    };
});
