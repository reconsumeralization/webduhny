import React from "react";
import { Element } from "@webiny/app-page-builder-elements";
import { DataSourceProvider } from "./DataSourceProvider";
import { useDynamicDocument } from "./useDynamicDocument";

export const AddDataSourceContext = Element.createDecorator(Original => {
    return function WithDataSourceContext(props) {
        const { dataSources } = useDynamicDocument();

        const { element } = props;

        const renderOriginal = <Original {...props} />;

        if (!element) {
            return renderOriginal;
        }

        const isEntriesList = element.type === "entries-list";

        if (isEntriesList) {
            const dataSource = dataSources.find(source => source.name === `element:${element.id}`);

            return (
                <DataSourceProvider dataSource={dataSource!}>{renderOriginal}</DataSourceProvider>
            );
        }

        return renderOriginal;
    };
});
