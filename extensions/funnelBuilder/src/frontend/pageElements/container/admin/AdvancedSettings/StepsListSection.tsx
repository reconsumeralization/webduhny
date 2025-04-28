// @ts-nocheck
import React, { useCallback } from "react";
import styled from "@emotion/styled";
import {
    useActiveElementId,
    useElementWithChildren,
    useUpdateElement
} from "@webiny/app-page-builder/editor";

import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import { StepsListItem } from "./StepsListSection/StepsListItem";

// Sorting.
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

// Icons.
import { ReactComponent as AddIcon } from "@material-design-icons/svg/outlined/add.svg";

// ----------------------------------------------------------------------------
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { createStepElement } from "../../../../../shared/createStepElement";
import { ContainerElementWithChildren } from "../../types";
import { getRandomId } from "../../../../../shared/getRandomId";

const StyledAccordion = styled(Accordion)`
    overflow: hidden;

    .accordion-content {
        padding: 0;
    }
`;

const AddPageButton = styled(ButtonSecondary)`
    display: block;
    margin: 20px auto;
`;

export const StepsListSection = () => {
    const updateElement = useUpdateElement();

    // const createElement = useCreateElement();
    const [activeElementId] = useActiveElementId();
    const containerElementWithChildren = useElementWithChildren(
        activeElementId!
    ) as ContainerElementWithChildren;

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove step",
        message: <p>Are you sure you want to remove this step?</p>
    });

    const deleteStep = useCallback(
        (elementId: string) => {
            showConfirmation(async () => {
                updateElement({
                    ...containerElementWithChildren,
                    elements: containerElementWithChildren.elements.filter(
                        element => element.id !== elementId
                    )
                });
            });
        },
        [containerElementWithChildren]
    );

    const createStep = useCallback(() => {
        const initialStepData = {
            id: getRandomId(),
            title: "New Step"
        };
        updateElement({
            ...containerElementWithChildren,
            data: {
                ...containerElementWithChildren.data,
                steps: [...containerElementWithChildren.data.steps, initialStepData]
            },
            elements: [...containerElementWithChildren.elements, createStepElement(initialStepData)]
        });
    }, [containerElementWithChildren]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = containerElementWithChildren.elements.findIndex(
                element => element.id === active.id
            );
            const newIndex = containerElementWithChildren.elements.findIndex(
                element => element.id === over.id
            );

            updateElement({
                ...containerElementWithChildren,
                elements: arrayMove(containerElementWithChildren.elements, oldIndex, newIndex)
            });
        }
    }

    const canDeleteSteps = containerElementWithChildren.elements.length > 1;

    return (
        <StyledAccordion title={"Pages"} defaultValue={true}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={containerElementWithChildren.elements}
                    strategy={verticalListSortingStrategy}
                >
                    {containerElementWithChildren.elements.map(element => (
                        <StepsListItem
                            key={element.id}
                            element={element}
                            canRemove={canDeleteSteps}
                            onRemove={deleteStep}
                        />
                    ))}
                    <AddPageButton onClick={createStep}>
                        <ButtonIcon icon={<AddIcon />} /> Add step
                    </AddPageButton>
                </SortableContext>
            </DndContext>
        </StyledAccordion>
    );
};
