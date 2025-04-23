import React, { useCallback } from "react";
import styled from "@emotion/styled";
import {
    useActiveElementId,
    useElementWithChildren,
    useUpdateElement
} from "@webiny/app-page-builder/editor";
import { ButtonIcon, ButtonSecondary } from "@webiny/ui/Button";
import { PagesListItem } from "./PagesSection/PagesListItem";

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
import { ContainerElement } from "../../types";

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

export const PagesSection = () => {
    const updateElement = useUpdateElement();
    const [activeElementId] = useActiveElementId();
    const container = useElementWithChildren(activeElementId!) as ContainerElement;

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove tab",
        message: <p>Are you sure you want to remove this page?</p>
    });

    const onRemove = useCallback(
        (elementId: string) => {
            showConfirmation(async () => {
                updateElement({
                    ...container,
                    elements: container.elements.filter(element => element.id !== elementId)
                });
            });
        },
        [container]
    );

    const onCreate = useCallback(() => {
        updateElement({
            ...container,
            // @ts-ignore
            elements: [
                ...container.elements,
                createStepElement({ title: `Step ${container.elements.length + 1}` })
            ]
        });
    }, [container]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = container.elements.findIndex(element => element.id === active.id);
            const newIndex = container.elements.findIndex(element => element.id === over.id);

            updateElement({
                ...container,
                elements: arrayMove(container.elements, oldIndex, newIndex)
            });
        }
    }

    return (
        <StyledAccordion title={"Pages"} defaultValue={true}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={container.elements}
                    strategy={verticalListSortingStrategy}
                >
                    {container.elements.map(element => (
                        <PagesListItem
                            key={element.id}
                            element={element}
                            canRemove={element.elements.length > 1}
                            // @ts-ignore
                            onRemove={onRemove}
                        />
                    ))}
                    <AddPageButton onClick={onCreate}>
                        <ButtonIcon icon={<AddIcon />} /> Add Page
                    </AddPageButton>
                </SortableContext>
            </DndContext>
        </StyledAccordion>
    );
};
