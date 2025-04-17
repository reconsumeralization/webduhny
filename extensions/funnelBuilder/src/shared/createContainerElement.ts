import { CONTAINER_ELEMENT_TYPE } from "./constants";
import { createStepElement } from "./createStepElement";
import { getRandomId } from "./getRandomId";

export const createContainerElement = () => {
    return {
        id: getRandomId(),
        type: CONTAINER_ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createStepElement({ title: "Page 1" })],
        data: { settings: {}, fields: [] }
    };
};
