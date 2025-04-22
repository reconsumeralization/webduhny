import React from "react";
import { IconButton } from "~/Button";
import { Tooltip } from "~/Tooltip";

interface AccordionItemActionsProps {
    children: React.ReactNode;
}

export const AccordionItemActions = ({ children }: AccordionItemActionsProps) => {
    return <>{children}</>;
};

export interface AccordionItemActionProps {
    icon: JSX.Element;
    onClick: () => void;
    tooltip?: string;
    disabled?: boolean;
}

export const AccordionItemAction = ({
    icon,
    onClick,
    tooltip,
    disabled
}: AccordionItemActionProps) => {
    const iconButton = (
        <IconButton
            disabled={disabled}
            icon={icon}
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
        />
    );

    if (!tooltip) {
        return iconButton;
    }

    return (
        <Tooltip placement={"bottom"} content={tooltip}>
            {iconButton}
        </Tooltip>
    );
};

export interface AccordionItemElementProps {
    element: JSX.Element;
}

export const AccordionItemElement = ({ element }: AccordionItemElementProps) => {
    return <div onClick={e => e.stopPropagation()}>{element}</div>;
};
