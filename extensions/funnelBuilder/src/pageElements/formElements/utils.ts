import { getRandomId } from "../../shared/getRandomId";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialElementData = (extra: Record<string, any> = {}) => ({
    field: {
        fieldId: getRandomId(),
        label: "",
        helpText: "",
        validators: [],
        extra
    }
});
