import React from "react";
import styled from "@emotion/styled";
import { StepElement } from "../../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "../Icon";
import { Input } from "@webiny/ui/Input";
import { Bind, Form } from "@webiny/form";
import { useDisclosure } from "../../../../../admin/useDisclosure";
import { validation } from "@webiny/validation";

// Icons.
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { ReactComponent as DragIndicatorIcon } from "@material-design-icons/svg/outlined/drag_indicator.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { useUpdateElement } from "@webiny/app-page-builder/editor";

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

const StyledDragIcon = styled(DragIndicatorIcon)`
    cursor: grab;
`;

interface StepsListItemProps {
    element: StepElement;
    canDeleteStep: boolean;
    onDeleteStep: () => void;
}

export const StepsListItem = ({ element, canDeleteStep, onDeleteStep }: StepsListItemProps) => {
    const {
        open: showTitleInput,
        close: hideEditTitleInput,
        isOpen: isTitleInputShown
    } = useDisclosure();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: element.id
    });

    const updateElement = useUpdateElement();
    const submitTitleForm = (data: { title: string }) => {
        const elementClone = structuredClone(element);
        elementClone.data.step.title = data.title;

        updateElement({
            ...elementClone,
            elements: elementClone.elements
        });

        hideEditTitleInput();
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const pageTitle = element.data.step.title;

    return (
        <ListItemStyled ref={setNodeRef} style={style}>
            <PageTitleContainer>
                {isTitleInputShown ? (
                    <Form<{ title: string }> data={{ title: pageTitle }} onSubmit={submitTitleForm}>
                        {({ submit }) => (
                            <Bind name={"title"} validators={validation.create("required")}>
                                <Input
                                    size={"small"}
                                    onBlur={hideEditTitleInput}
                                    autoFocus
                                    onKeyDown={e => {
                                        // @ts-expect-error
                                        if (e.key === "Enter") {
                                            submit();
                                        }

                                        // On Escape, cancel changes and hide the input.
                                        // @ts-expect-error
                                        if (e.key === "Escape") {
                                            hideEditTitleInput();
                                        }
                                    }}
                                />
                            </Bind>
                        )}
                    </Form>
                ) : (
                    <>
                        {pageTitle}
                        <Icon size={20} element={<EditIcon />} onClick={() => showTitleInput()} />
                    </>
                )}
            </PageTitleContainer>

            <IconsContainer>
                {canDeleteStep && <Icon element={<DeleteIcon />} onClick={onDeleteStep} />}

                <Icon element={<StyledDragIcon />} {...attributes} {...listeners} />
            </IconsContainer>
        </ListItemStyled>
    );
};
