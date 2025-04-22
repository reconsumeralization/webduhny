import { getRandomId } from "../../../shared/getRandomId";
import {FunnelFieldDefinitionModelDto} from "../../../shared/models/FunnelFieldDefinitionModel";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialFieldData = <TFieldElementData extends FunnelFieldDefinitionModelDto>(
    fieldType: string,
    extra: TFieldElementData["extra"]
): TFieldElementData => {
    return {
        id: getRandomId(),
        fieldId: getRandomId(),
        type: fieldType,
        label: "",
        helpText: "",
        validators: [],
        extra
    } as unknown as TFieldElementData; // Explicitly cast the object to TFieldElementData
};
