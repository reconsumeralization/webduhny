import React, { createContext } from "react";
import {
    PbPageTemplateDataBinding,
    PbPageTemplateDataSource
} from "@webiny/app-page-builder/types";

export const DynamicDocumentContext = createContext<{
    dataSources: PbPageTemplateDataSource[];
    dataBindings: PbPageTemplateDataBinding[];
}>({ dataSources: [], dataBindings: [] });

interface Props {
    children: React.ReactNode;
    dataSources: PbPageTemplateDataSource[];
    dataBindings: PbPageTemplateDataBinding[];
}

export const DynamicDocumentProvider = ({ children, dataSources, dataBindings }: Props) => {
    return (
        <DynamicDocumentContext.Provider value={{ dataSources, dataBindings }}>
            {children}
        </DynamicDocumentContext.Provider>
    );
};
