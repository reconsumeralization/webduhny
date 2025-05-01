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
            console.log("containerElementWithChildren", containerElementWithChildren);
            console.log("stepId", stepId);
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

            updateElement(
                {
                    ...containerElementWithChildren,
                    data: {
                        ...containerElementWithChildren.data,
                        steps: [...containerElementWithChildren.data.steps, initialStepData]
                    },

                    // @ts-ignore Incompatible types. Ignoring for now.
                    elements: [
                        ...containerElementWithChildren.elements,
                        createStepElement(initialStepData)
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
