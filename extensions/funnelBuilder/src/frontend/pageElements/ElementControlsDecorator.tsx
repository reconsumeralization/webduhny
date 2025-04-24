import React, { useState } from "react";
import { ElementControls } from "@webiny/app-page-builder/editor/contexts/EditorPageElementsProvider/ElementControls";
import { useRenderer } from "@webiny/app-page-builder-elements";
import {
    useActiveElementId,
    useElementById,
    useEventActionHandler
} from "@webiny/app-page-builder/editor";
import styled from "@emotion/styled";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { IconButton } from "@webiny/ui/Button";
import { isFieldElementType } from "../../shared/constants";
import { Tooltip } from "@webiny/ui/Tooltip";
import { FieldElement } from "./fields/types";
import FieldSettingsDialog from "../admin/FieldSettingsDialog";
import { UpdateElementActionEvent } from "@webiny/app-page-builder/editor/recoil/actions";

const EditFieldButtonWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
`;

const EditFieldButton = styled(IconButton)`
    padding: 0;
    margin: 4px;
    width: 36px;
    height: 36px;

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const DecoratedElementControls = ElementControls.createDecorator(Component => {
    return function DecoratedElementControls(props) {
        const { getElement } = useRenderer();
        const element = getElement();

        const [activeElementId] = useActiveElementId();
        const [editorElement] = useElementById(element.id);

        const eventHandler = useEventActionHandler();
        const [currentFieldElement, setCurrentFieldElement] = useState<FieldElement | null>(null);

        if (!isFieldElementType(element.type)) {
            return <Component {...props} />;
        }

        const isActive = activeElementId === element.id;
        const isHighlighted = editorElement?.isHighlighted ?? false;

        if (!isActive && !isHighlighted) {
            return <Component {...props} />;
        }

        return (
            <>
                <EditFieldButtonWrapper>
                    <Tooltip content={"Edit field setting"} placement={"bottom"}>
                        <EditFieldButton
                            icon={<EditIcon />}
                            onClick={() => {
                                setCurrentFieldElement(element as FieldElement);
                            }}
                        />
                    </Tooltip>
                </EditFieldButtonWrapper>

                <FieldSettingsDialog
                    field={currentFieldElement?.data}
                    onClose={() => setCurrentFieldElement(null)}
                    onSubmit={data => {
                        eventHandler.trigger(
                            new UpdateElementActionEvent({
                                element: { ...currentFieldElement!, data },
                                history: false
                            })
                        );
                    }}
                />

                <Component {...props} />
            </>
        );
    };
});
