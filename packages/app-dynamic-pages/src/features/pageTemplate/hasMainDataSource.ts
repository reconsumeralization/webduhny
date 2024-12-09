import type { PbPageTemplateDataSource } from "@webiny/app-page-builder/types";

export const hasMainDataSource = (dataSources: PbPageTemplateDataSource[]): boolean => {
    return dataSources.some(source => source.name === "main");
};
