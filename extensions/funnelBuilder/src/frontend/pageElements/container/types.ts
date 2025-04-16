import { PbEditorElement } from "@webiny/app-page-builder/types";

export interface ContainerData {
    fields: any[]
}

export interface FunnelBuilderMainElement extends PbEditorElement {
    elements: FunnelBuilderPageElement[];
}

export interface FunnelBuilderPageElement extends PbEditorElement {
    data: {
        fub: {
            page: {
                id: string;
                title: string;
            };
        };
    };
}
