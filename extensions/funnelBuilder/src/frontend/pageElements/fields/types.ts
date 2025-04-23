import { PbEditorElement } from "@webiny/app-page-builder/types";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";

export type FieldElementData<TExtra = {}> = Omit<FunnelFieldDefinitionModelDto<TExtra>, "stepId">;

export interface FieldElement<TExtra = {}> extends PbEditorElement {
    data: FieldElementData<TExtra>;
}
