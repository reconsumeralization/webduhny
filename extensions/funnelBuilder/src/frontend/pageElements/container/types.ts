import { PbEditorElement } from "@webiny/app-page-builder/types";

export interface IContainerElementData {
    fields: any[]
}

export interface IContainerElement extends PbEditorElement {
    elements: IStepElement[];
    data: IContainerElementData;
}

export interface IStepElement extends PbEditorElement {
    data: {
        fub: {
            page: {
                id: string;
                title: string;
            };
        };
    };
}
