import React from "react";
import { EditorConfig } from "@webiny/app-page-builder/editor";
import { InjectDynamicValues } from "./InjectDynamicValues";
import {
    AddBindingContext,
    AddDataSourceContext,
    DataSourceProvider,
    useDynamicDocument
} from "~/dataInjection";
import { ElementDataSettings } from "./ElementDataSettings";
import { DataSourceConfigAndBindings } from "./DataSourceConfigAndBindings";
import { ElementInputs } from "~/dataInjection/editor/DataSourceProperties/ElementInputs";
import { DeveloperUtilities } from "./DeveloperUtilities";

const { Ui } = EditorConfig;

const ContentDecorator = Ui.Content.createDecorator(Original => {
    return function ContentWithPreview() {
        const { dataSources } = useDynamicDocument();

        const dataSource = dataSources.find(ds => ds.name === "main");

        if (!dataSource) {
            return <Original />;
        }

        return (
            <DataSourceProvider dataSource={dataSource!}>
                <Original />
            </DataSourceProvider>
        );
    };
});

export const SetupDynamicDataInEditor = () => {
    return (
        <>
            <DeveloperUtilities />
            <ContentDecorator />
            <InjectDynamicValues />
            <AddDataSourceContext />
            <AddBindingContext />
            <Ui.Sidebar.Group name={"data"} element={<ElementDataSettings />} />
            <DataSourceConfigAndBindings />
            <ElementInputs />
        </>
    );
};
