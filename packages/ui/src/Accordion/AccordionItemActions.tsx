import React from "react";
import { IconButton } from "~/Button";

interface AccordionItemActionsProps {
    children: React.ReactNode;
}

export const AccordionItemActions = ({ children }: AccordionItemActionsProps) => {
    return <>{children}</>;
};

export interface AccordionItemActionProps {
    icon: JSX.Element;
    onClick: () => void;
    disabled?: boolean;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Accordion.Item.Action` component from the `@webiny/admin-ui` package instead.
 */
export const AccordionItemAction = ({ icon, onClick, disabled }: AccordionItemActionProps) => {
    return (
        <IconButton
            disabled={disabled}
            icon={icon}
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
        />
    );
};

export interface AccordionItemElementProps {
    element: JSX.Element;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Accordion.Item.Action` component from the `@webiny/admin-ui` package instead.
 */
export const AccordionItemElement = ({ element }: AccordionItemElementProps) => {
    return <div onClick={e => e.stopPropagation()}>{element}</div>;
};
