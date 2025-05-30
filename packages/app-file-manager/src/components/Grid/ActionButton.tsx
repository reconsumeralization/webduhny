import React from "react";
import { IconButton, Tooltip } from "@webiny/admin-ui";

export interface ActionButtonProps {
    icon: JSX.Element;
    label?: string;
    onAction: () => void;
    "data-testid"?: string;
    disabled?: boolean;
}

export const ActionButton = ({ icon, label, onAction, disabled, ...props }: ActionButtonProps) => {
    return (
        <Tooltip
            content={label ?? "Custom action"}
            trigger={
                <IconButton
                    variant={"tertiary"}
                    size={"sm"}
                    icon={icon}
                    onClick={onAction}
                    disabled={disabled}
                    data-testid={props["data-testid"]}
                />
            }
        />
    );
};
