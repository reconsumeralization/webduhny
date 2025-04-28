import { PbEditorElement } from "@webiny/app-page-builder/types";

export interface StepElementData {
    step: {
        id: string;
        title: string;
    };
}

export interface StepElement extends PbEditorElement {
    data: StepElementData;
}
