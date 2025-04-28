import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useActiveElementId, useElementWithChildren } from "@webiny/app-page-builder/editor";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import {useSnackbar     } from "@webiny/app-admin";
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
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ContainerElementWithChildren } from "../../types";
import { useEditorElements } from "../../../useEditorElements";

// Icons.
import { ReactComponent as AddIcon } from "@material-design-icons/svg/outlined/add.svg";

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
    const [activeElementId] = useActiveElementId();
    const containerElementWithChildren = useElementWithChildren(
        activeElementId!
    ) as ContainerElementWithChildren;

    const {showSnackbar} = useSnackbar();
    const { showConfirmation } = useConfirmationDialog({
        title: "Remove step",
        message: <p>Are you sure you want to remove this step?</p>
    });

    const editorElements = useEditorElements();

    const deleteStep = useCallback(
        (stepId: string) => {
            showConfirmation(async () => {
                editorElements.deleteStep(containerElementWithChildren, stepId);
                showSnackbar("Step deleted successfully.");
            });
        },
        [containerElementWithChildren]
    );

    const createStep = useCallback(() => {
        editorElements.createStep(containerElementWithChildren);
    }, [containerElementWithChildren]);

    function moveStep(event: any) {
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }

        const srcStepIndex = containerElementWithChildren.elements.findIndex(
            element => element.id === active.id
        );
        const targetStepIndex = containerElementWithChildren.elements.findIndex(
            element => element.id === over.id
        );

        editorElements.moveStep(containerElementWithChildren, srcStepIndex, targetStepIndex);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const canDeleteSteps = containerElementWithChildren.elements.length > 1;

    return (
        <StyledAccordion title={"Pages"} defaultValue={true}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={moveStep}
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
                            canDeleteStep={canDeleteSteps}
                            onDeleteStep={() => {
                                const stepId = element.data.step.id;
                                deleteStep(stepId);
                            }}
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
