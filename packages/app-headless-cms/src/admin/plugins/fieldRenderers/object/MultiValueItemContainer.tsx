import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import Accordion from "~/admin/plugins/fieldRenderers/Accordion";
import { GenericRecord } from "@webiny/app/types";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete_outline.svg";
import { ReactComponent as ArrowUp } from "@material-design-icons/svg/outlined/arrow_drop_up.svg";
import { ReactComponent as ArrowDown } from "@material-design-icons/svg/outlined/arrow_drop_down.svg";
import { IconButton } from "@webiny/ui/Button";

export interface MultiValueItemContainerProps {
    value: GenericRecord<string>;
    isFirst: boolean;
    isLast: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDelete: () => void;
    isExpanded: boolean;
    toggleExpanded: () => void;
    title: string;
    children: React.ReactNode;
}

export const MultiValueItemContainer = makeDecoratable(
    "MultiValueItemContainer",
    ({ children, ...props }: MultiValueItemContainerProps) => {
        const { onMoveUp, onMoveDown, onDelete, isLast, isFirst } = props;

        const actions = (
            <>
                <IconButton
                    icon={<ArrowDown />}
                    onClick={e => {
                        e.stopPropagation();
                        onMoveDown();
                    }}
                    disabled={isLast}
                />
                <IconButton
                    icon={<ArrowUp />}
                    onClick={e => {
                        e.stopPropagation();
                        onMoveUp();
                    }}
                    disabled={isFirst}
                />
                <IconButton
                    icon={<DeleteIcon />}
                    onClick={e => {
                        e.stopPropagation();
                        onDelete();
                    }}
                />
            </>
        );

        return (
            <Accordion
                title={props.title}
                action={actions}
                isExpanded={props.isExpanded}
                toggleExpanded={props.toggleExpanded}
            >
                {children}
            </Accordion>
        );
    }
);
