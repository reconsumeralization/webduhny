export const FUB_ELEMENT_TYPE_PREFIX = "fub-";

export const createElementType = (type: string) => {
    return `${FUB_ELEMENT_TYPE_PREFIX}${type}`;
}

export const CONTAINER_ELEMENT_TYPE = createElementType("container");