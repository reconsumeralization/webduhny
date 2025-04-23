import { PbEditorElement } from "@webiny/app-page-builder/types";
import { FunnelModelDto } from "../../../shared/models/FunnelModel";

export interface ContainerElement extends PbEditorElement {
    elements: IStepElement[];
    data: FunnelModelDto;
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
