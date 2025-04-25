export const FUB_ELEMENT_TYPE_PREFIX = "fub-";
export const FUB_FIELD_ELEMENT_TYPE_PREFIX = FUB_ELEMENT_TYPE_PREFIX + "field-";

export const createElementType = (type: string) => {
    return `${FUB_ELEMENT_TYPE_PREFIX}${type}`;
};

export const createFieldElementType = (type: string) => {
    return `${FUB_FIELD_ELEMENT_TYPE_PREFIX}${type}`;
};

export const isFieldElementType = (type: string) => {
    return type.startsWith(FUB_FIELD_ELEMENT_TYPE_PREFIX);
};

export const isContainerElementType = (type: string) => {
    return type === CONTAINER_ELEMENT_TYPE;
};

export const CONTAINER_ELEMENT_TYPE = createElementType("container");
