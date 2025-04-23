import { getRandomId } from "../../../shared/getRandomId";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialFieldData = (fieldType: string, extra: Record<string, any> = {}) => {
    return {
        id: getRandomId(),
        fieldId: getRandomId(),
        type: fieldType,
        label: "",
        helpText: "",
        validators: [],
        extra
    } as Omit<FunnelFieldDefinitionModelDto, "stepId">;
};
