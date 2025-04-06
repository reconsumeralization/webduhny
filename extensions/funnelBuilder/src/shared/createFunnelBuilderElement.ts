import { ELEMENT_TYPE } from "./constants";
import { createPageElement } from "./createPageElement";
import { getRandomId } from "./getRandomId";

export const createFunnelBuilderElement = () => {
    return {
        id: getRandomId(),
        type: ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createPageElement({ title: "Page 1" })],
        data: { settings: {} }
    };
};
