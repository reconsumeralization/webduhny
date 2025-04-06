import { ELEMENT_TYPE } from "./constants";
import { createPageElement } from "./createPageElement";

export const createFunnelBuilderElement = () => {
    return {
        type: ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createPageElement({ title: "Page 1" })],
        data: {}
    };
};
