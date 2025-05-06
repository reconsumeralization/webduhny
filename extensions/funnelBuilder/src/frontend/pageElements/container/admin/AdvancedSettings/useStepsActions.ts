import { useUpdateElement } from "@webiny/app-page-builder/editor";
import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { ContainerElementWithChildren } from "../../types";
import { getRandomId } from "../../../../../shared/getRandomId";
import { createStepElement } from "../../../../../shared/createStepElement";

export const useStepsActions = () => {
    const updateElement = useUpdateElement();

    const deleteStep = useCallback(
        (containerElementWithChildren: ContainerElementWithChildren, stepId: string) => {
            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: containerElementWithChildren.data.steps.filter(
                            step => step.id !== stepId
                        )
                    },
                    elements: containerElementWithChildren.elements.filter(
                        element => element.data.step.id !== stepId
                    )
                },
                { history: false }
            );
        },
        [updateElement]
    );

    const createStep = useCallback(
        (containerElementWithChildren: ContainerElementWithChildren) => {
            const initialStepData = {
                id: getRandomId(),
                title: "New Page"
            };

            // We insert the step before the last one. We always keep the last step as
            // the last one because that's the success page step.
            const lastStepIndex = containerElementWithChildren.data.steps.length - 1;

            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: [
                            ...containerElementWithChildren.data.steps.slice(0, lastStepIndex),
                            initialStepData,
                            ...containerElementWithChildren.data.steps.slice(lastStepIndex)
                        ]
                    },

                    // @ts-ignore Incompatible types. Ignoring for now.
                    elements: [
                        ...containerElementWithChildren.elements.slice(0, lastStepIndex),
                        createStepElement(initialStepData),
                        ...containerElementWithChildren.elements.slice(lastStepIndex)
                    ]
                },
                { history: false }
            );
        },
        [updateElement]
    );

    const moveStep = useCallback(
        (
            containerElementWithChildren: ContainerElementWithChildren,
            oldIndex: number,
            newIndex: number
        ) => {
            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: arrayMove(
                            containerElementWithChildren.data.steps,
                            oldIndex,
                            newIndex
                        )
                    },
                    elements: arrayMove(containerElementWithChildren.elements, oldIndex, newIndex)
                },
                { history: false }
            );
        },
        [updateElement]
    );

    return {
        deleteStep,
        createStep,
        moveStep
    };
};
