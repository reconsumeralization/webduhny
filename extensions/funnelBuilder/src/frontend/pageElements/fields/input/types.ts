import { FunnelFieldDefinitionModelDto } from "../../../../shared/models/FunnelFieldDefinitionModel";

export type InputElementData = Omit<
    FunnelFieldDefinitionModelDto<{
        inputType: string;
        placeholderText: string;
    }>,
    "stepId"
>;
