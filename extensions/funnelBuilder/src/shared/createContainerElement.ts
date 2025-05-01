import { CONTAINER_ELEMENT_TYPE } from "./constants";
import { createStepElement } from "./createStepElement";
import { getRandomId } from "./getRandomId";
import { FunnelStepModelDto } from "./models/FunnelStepModel";

export const createContainerElement = () => {
    const initialStepData: FunnelStepModelDto = {
        id: getRandomId(),
        title: "New page"
    };

    return {
        id: getRandomId(),
        type: CONTAINER_ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createStepElement(initialStepData)],
        data: { settings: {}, fields: [], steps: [initialStepData] }
    };
};
