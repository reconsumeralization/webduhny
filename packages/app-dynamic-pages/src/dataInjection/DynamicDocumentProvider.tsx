import React, { createContext } from "react";
import {
    PbPageTemplateDataBinding,
    PbPageTemplateDataSource
} from "@webiny/app-page-builder/types";

const passthrough = (cb: Updater<any>) => cb([]);

export const DynamicDocumentContext = createContext<{
    dataSources: PbPageTemplateDataSource[];
    dataBindings: PbPageTemplateDataBinding[];
    updateDataSources: (cb: Updater<PbPageTemplateDataSource>) => void;
    updateDataBindings: (cb: Updater<PbPageTemplateDataBinding>) => void;
}>({
    dataSources: [],
    dataBindings: [],
    updateDataBindings: passthrough,
    updateDataSources: passthrough
});

interface Props {
    children: React.ReactNode;
    dataSources: PbPageTemplateDataSource[];
    dataBindings: PbPageTemplateDataBinding[];
    onDataSources: (dataSources: PbPageTemplateDataSource[]) => void;
    onDataBindings: (dataBindings: PbPageTemplateDataBinding[]) => void;
}

export interface Updater<T> {
    (items: T[]): T[];
}

export const DynamicDocumentProvider = ({
    children,
    dataSources,
    dataBindings,
    onDataSources,
    onDataBindings
}: Props) => {
    const updateDataBindings = (cb: Updater<PbPageTemplateDataBinding>) => {
        onDataBindings(cb(dataBindings));
    };

    const updateDataSources = (cb: Updater<PbPageTemplateDataSource>) => {
        onDataSources(cb(dataSources));
    };

    return (
        <DynamicDocumentContext.Provider
            value={{ dataSources, dataBindings, updateDataSources, updateDataBindings }}
        >
            {children}
        </DynamicDocumentContext.Provider>
    );
};
