import { getRandomId } from "../../../shared/getRandomId";
import { FieldElementData } from "./types";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialFieldData = <TFieldElementData extends FieldElementData>(
    fieldType: string,
    extra: TFieldElementData["field"]["extra"]
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
