import React from "react";
import styled from "@emotion/styled";
import type { PbBlockVariable } from "~/types";
import { useSortableList } from "~/hooks/useSortableList";
import { Collapsable } from "~/editor/defaultConfig/Toolbar/Navigator/StyledComponents";
import { ReactComponent as DragIndicatorIcon } from "~/editor/defaultConfig/Toolbar/Navigator/assets/drag_indicator_24px.svg";

const VariableItem = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderTop: "1px solid var(--mdc-theme-background)",

    "&:hover": {
        backgroundColor: "var(--mdc-theme-background)",
        color: "var(--mdc-theme-primary)",

        "&>div": {
            display: "block"
        }
    },

    "&>svg": {
        cursor: "move"
    }
});

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
    if (!isOver || elementType !== "variable") {
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

interface VariableListItemProps {
    variable: PbBlockVariable;
    index: number;
    move: (current: number, next: number) => void;
}

export const VariablesListItem = ({ variable, index, move }: VariableListItemProps) => {
    const {
        ref: dragAndDropRef,
        handlerId,
        isOver,
        dropItemAbove
    } = useSortableList({
        id: `${variable.blockId}:${variable.elementId}:${variable.inputName}`,
        move,
        index,
        type: "variable"
    });

    const highlightItem = getHighlightItemProps({
        isOver,
        dropItemAbove,
        elementType: "variable"
    });

    return (
        <Collapsable ref={dragAndDropRef} data-handler-id={handlerId} highlightItem={highlightItem}>
            <VariableItem>
                {variable.label} ({variable.elementId})
                <DragIndicatorIcon />
            </VariableItem>
        </Collapsable>
    );
};
