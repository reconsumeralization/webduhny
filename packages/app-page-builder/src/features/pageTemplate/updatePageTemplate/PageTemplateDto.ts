import { PbPageTemplateDataBinding, PbPageTemplateDataSource } from "~/types";

export interface PageTemplateDto {
    id: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    layout: string;
    dataSources: PbPageTemplateDataSource[];
    dataBindings: PbPageTemplateDataBinding[];
}
