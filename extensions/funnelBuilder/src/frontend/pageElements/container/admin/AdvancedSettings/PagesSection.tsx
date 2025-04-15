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
import { createPageElement } from "@f/shared/createPageElement";
import { FunnelBuilderMainElement } from "../../types";

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
    const mainElement = useElementWithChildren(activeElementId!) as FunnelBuilderMainElement;

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove tab",
        message: <p>Are you sure you want to remove this page?</p>
    });

    const onRemove = useCallback(
        (elementId: string) => {
            showConfirmation(async () => {
                updateElement({
                    ...mainElement,
                    elements: mainElement.elements.filter(element => element.id !== elementId)
                });
            });
        },
        [mainElement]
    );

    const onCreate = useCallback(() => {
        updateElement({
            ...mainElement,
            // @ts-ignore
            elements: [
                ...mainElement.elements,
                createPageElement({ title: `Page ${mainElement.elements.length + 1}` })
            ]
        });
    }, [mainElement]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = mainElement.elements.findIndex(element => element.id === active.id);
            const newIndex = mainElement.elements.findIndex(element => element.id === over.id);

            updateElement({
                ...mainElement,
                elements: arrayMove(mainElement.elements, oldIndex, newIndex)
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
                    items={mainElement.elements}
                    strategy={verticalListSortingStrategy}
                >
                    {mainElement.elements.map(element => (
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
