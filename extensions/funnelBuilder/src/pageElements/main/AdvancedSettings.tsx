import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { ButtonIcon, IconButton, ButtonSecondary } from "@webiny/ui/Button";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import {
    activeElementAtom,
    elementWithChildrenByIdSelector
} from "@webiny/app-page-builder/editor/recoil/modules";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { moveInPlace, useSortableList } from "@webiny/app-page-builder/hooks/useSortableList";
import { useUpdateElement } from "@webiny/app-page-builder/editor/hooks/useUpdateElement";
import { FunnelBuilderMainElement, FunnelBuilderPageElement } from "./types";
import { createPageElement } from "../../shared/createPageElement";
import { useConditionalRulesDialog } from "./useConditionalRulesDialog";

// Icons.
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as DragIndicatorIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";
import { ReactComponent as AddIcon } from "@material-design-icons/svg/outlined/add.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";

const PagesAccordion = styled(Accordion)`
    .accordion-content {
        padding: 0;
    }
`;

const AddPageButton = styled(ButtonSecondary)`
    display: block;
    margin: 20px auto;
`;

const EditConditionalRulesButton = styled(ButtonSecondary)`
    display: block;
    margin: 4px auto;
`;

const ListItemStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--mdc-theme-background);
`;

const PageTitleContainer = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    svg {
        height: 20px;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    gap: 4px;
`;

const Icon = styled.div`
    height: 24px;
    cursor: pointer;
    fill: var(--mdc-theme-text-secondary-on-background);
`;

interface GetHighlightItemPropsParams {
    dropItemAbove?: boolean;
    isOver?: boolean;
    elementType: string;
}

const getHighlightItemProps = ({
    dropItemAbove,
    isOver,
    elementType
}: GetHighlightItemPropsParams) => {
    if (!isOver || elementType !== "tab") {
        return {
            top: false,
            bottom: false
        };
    }
    if (dropItemAbove) {
        return {
            top: true,
            bottom: false
        };
    }
    return {
        top: false,
        bottom: true
    };
};

const ListItem = ({
    element,
    index,
    move,
    canRemove,
    onRemove
}: {
    element: FunnelBuilderPageElement;
    index: number;
    move: (current: number, next: number) => void;
    canRemove: boolean;
    onRemove: (variableId: string) => void;
}) => {
    const {
        ref: dragAndDropRef,
        handlerId,
        isOver,
        dropItemAbove
    } = useSortableList({
        move,
        id: element.id,
        index,
        type: "tab"
    });

    const highlightItem = getHighlightItemProps({
        isOver,
        dropItemAbove,
        elementType: "tab"
    });

    return (
        <ListItemStyled>
            <PageTitleContainer>
                {element.data.fub.page.title || "Page"}
                <IconButton icon={<EditIcon />}/>
            </PageTitleContainer>

            <IconsContainer>
                {canRemove && (
                    <Icon>
                        <DeleteIcon onClick={() => onRemove(element.id)} />
                    </Icon>
                )}

                <Icon>
                    <DragIndicatorIcon />
                </Icon>
            </IconsContainer>
        </ListItemStyled>
    );
};

export const AdvancedSettings = () => {
    const activeElementId = useRecoilValue(activeElementAtom);
    const element = useRecoilValue(
        elementWithChildrenByIdSelector(activeElementId)
    ) as FunnelBuilderMainElement;

    const updateElement = useUpdateElement();

    const { showConfirmation } = useConfirmationDialog({
        title: "Remove tab",
        message: <p>Are you sure you want to remove this page?</p>
    });

    const onMove = useCallback(
        (current: number, next: number) => {
            const reorderedElements = moveInPlace(element?.elements, current, next);

            updateElement({
                ...element,
                elements: reorderedElements
            });
        },
        [element]
    );

    const onRemove = useCallback(
        (elementId: string) => {
            showConfirmation(async () => {
                updateElement({
                    ...element,
                    elements: element.elements.filter(element => element.id !== elementId)
                });
            });
        },
        [element]
    );

    const onCreate = useCallback(() => {
        updateElement({
            ...element,
            // @ts-ignore
            elements: [
                ...element.elements,
                createPageElement({ title: `Page ${element.elements.length + 1}` })
            ]
        });
    }, [element]);

    const { showDialog: showConditionalRulesDialog } = useConditionalRulesDialog();

    return (
        <>
            <PagesAccordion title={"Pages"} defaultValue={true}>
                <>
                    {element.elements.map((pageElement, index: number) => (
                        <ListItem
                            key={index}
                            index={index}
                            element={pageElement}
                            move={onMove}
                            canRemove={element.elements.length > 1}
                            onRemove={onRemove}
                        />
                    ))}
                    <AddPageButton onClick={onCreate}>
                        <ButtonIcon icon={<AddIcon />} /> Add Page
                    </AddPageButton>
                </>
            </PagesAccordion>

            <Accordion title={"Conditional Rules"} defaultValue={true}>
                <EditConditionalRulesButton onClick={showConditionalRulesDialog}>
                    Edit Conditional Rules
                </EditConditionalRulesButton>
            </Accordion>
        </>
    );
};
