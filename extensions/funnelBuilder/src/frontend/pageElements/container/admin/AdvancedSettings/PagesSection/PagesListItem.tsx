import React from "react";
import styled from "@emotion/styled";
import { FunnelBuilderPageElement } from "../../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "../Icon";
import { Input } from "@webiny/ui/Input";
import { Form, Bind } from "@webiny/form";
import { useDisclosure } from "@f/frontend/admin/useDisclosure";
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

interface PagesListItemProps {
    element: FunnelBuilderPageElement;
    canRemove?: boolean;
    onRemove?: () => void;
}

export const PagesListItem = ({ element }: PagesListItemProps) => {
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
        elementClone.data.fub.page.title = data.title;

        updateElement({
            ...elementClone,
            elements: elementClone.elements
        });

        hideEditTitleInput();
    };

    const canRemove = true;
    const onRemove = (id: string) => {};

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const pageTitle = element.data.fub.page.title || "Page";

    return (
        <ListItemStyled ref={setNodeRef} style={style}>
            <PageTitleContainer>
                {isTitleInputShown ? (
                    <Form<{ title: string }> data={{ title: pageTitle }} onSubmit={submitTitleForm}>
                        {({ submit }) => (
                            <Bind name={"title"} validators={validation.create("required")}>
                                <Input
                                    size={"small"}
                                    onBlur={() => {
                                        hideEditTitleInput();
                                    }}
                                    autoFocus
                                    onKeyDown={e => {
                                        // @ts-expect-error
                                        if (e.key === "Enter") {
                                            console.log("zovuii");
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
                {canRemove && (
                    <Icon element={<DeleteIcon />} onClick={() => onRemove(element.id)} />
                )}

                <Icon element={<StyledDragIcon />} {...attributes} {...listeners} />
            </IconsContainer>
        </ListItemStyled>
    );
};
