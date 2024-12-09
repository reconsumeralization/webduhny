import React from "react";
import styled from "@emotion/styled";
import { PbPageTemplateWithContent } from "@webiny/app-page-builder/types";
import { RenderPluginsLoader } from "@webiny/app-page-builder/admin";
import { Content } from "@webiny/app-page-builder-elements";
import { DataSourceProvider, DynamicDocumentProvider } from "~/dataInjection";

const LivePreviewContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--mdc-theme-on-background);
    height: calc(100vh - 260px);
    overflow: auto;
`;

export interface PreviewPaneProps {
    template: PbPageTemplateWithContent;
}

export const PreviewPane = ({ template }: PreviewPaneProps) => {
    const mainDataSource = template.dataSources.find(ds => ds.name === "main");

    return (
        <RenderPluginsLoader>
            <LivePreviewContainer>
                <DynamicDocumentProvider
                    dataSources={template.dataSources}
                    dataBindings={template.dataBindings}
                >
                    <DataSourceProvider dataSource={mainDataSource!}>
                        <Content content={template.content} />
                    </DataSourceProvider>
                </DynamicDocumentProvider>
            </LivePreviewContainer>
        </RenderPluginsLoader>
    );
};
