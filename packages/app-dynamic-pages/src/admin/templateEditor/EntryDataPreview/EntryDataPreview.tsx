import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";
import { InjectDynamicValues } from "./InjectDynamicValues";
import {
    AddBindingContext,
    AddDataSourceContext,
    DataSourceProvider,
    useDynamicDocument
} from "~/dataInjection";

const { Ui } = TemplateEditorConfig;

const ContentDecorator = Ui.Content.createDecorator(Original => {
    return function ContentWithPreview() {
        const { dataSources } = useDynamicDocument();

        const dataSource = dataSources.find(ds => ds.name === "main");

        return (
            <DataSourceProvider dataSource={dataSource!}>
                <Original />
            </DataSourceProvider>
        );
    };
});

export const EntryDataPreview = () => {
    return (
        <>
            <ContentDecorator />
            <InjectDynamicValues />
            <AddDataSourceContext />
            <AddBindingContext />
        </>
    );
};
