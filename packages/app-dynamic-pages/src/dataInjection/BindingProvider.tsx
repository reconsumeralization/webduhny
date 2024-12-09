import React, { createContext } from "react";
import { PbPageTemplateDataBinding } from "@webiny/app-page-builder/types";

export const BindingContext = createContext<PbPageTemplateDataBinding | undefined>(undefined);

export interface BindingProviderProps {
    binding: PbPageTemplateDataBinding;
    children: React.ReactNode;
}

export const BindingProvider = ({ binding, children }: BindingProviderProps) => {
    return <BindingContext.Provider value={binding}>{children}</BindingContext.Provider>;
};
