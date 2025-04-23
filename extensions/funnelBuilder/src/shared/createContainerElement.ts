import { CONTAINER_ELEMENT_TYPE } from "./constants";
import { createStepElement } from "./createStepElement";
import { getRandomId } from "./getRandomId";
import { FunnelStepModelDto } from "./models/FunnelStepModel";

export const createContainerElement = () => {
    const initialStep: FunnelStepModelDto = {
        id: getRandomId(),
        title: "Step 1"
    };

    return {
        id: getRandomId(),
        type: CONTAINER_ELEMENT_TYPE,

        // We are immediately creating a grid element inside our new page element.
        // This was users can start adding content to the grid right away.
        elements: [createStepElement(initialStep)],
        data: { settings: {}, fields: [], steps: [initialStep] }
    };
};
