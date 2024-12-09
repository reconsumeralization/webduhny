import React, { createContext, useMemo } from "react";
import { useLoadDataSource } from "@webiny/app-page-builder/features";
import { PbPageTemplateDataSource } from "@webiny/app-page-builder/types";
import type { GenericRecord } from "@webiny/app/types";
import { useDynamicDocument } from "./useDynamicDocument";
import { DataSourceDataProvider } from "./DataSourceDataProvider";

export interface PreviewDataProviderProps {
    dataSource: PbPageTemplateDataSource;
    children: React.ReactNode;
}

export interface DataSourceContext {
    data: GenericRecord;
    dataSource: PbPageTemplateDataSource;
    loadData: (params: GenericRecord) => void;
}

export const DataSourceContext = createContext<DataSourceContext | undefined>(undefined);

export const DataSourceProvider = ({ dataSource, children }: PreviewDataProviderProps) => {
    const { dataBindings } = useDynamicDocument();

    const paths = useMemo(() => {
        const binds = dataBindings
            .filter(b => b.dataSource === dataSource.name)
            .map(binding => binding.bindFrom);

        return Array.from(new Set(binds)).sort();
    }, [dataBindings]);

    const { data, loadData } = useLoadDataSource(dataSource, paths);

    return (
        <DataSourceContext.Provider value={{ dataSource, data, loadData }}>
            {/* TODO: Maybe this next provider is not necessary here? */}
            <DataSourceDataProvider dataSource={data || {}}>{children}</DataSourceDataProvider>
        </DataSourceContext.Provider>
    );
};
