import React from "react";
import { IconButton, Tooltip } from "@webiny/admin-ui";

export interface ActionButtonProps {
    label: string;
    icon: JSX.Element;
    onAction: () => void;
    "data-testid"?: string;
    disabled?: boolean;
}

export const ActionButton = ({ label, icon, onAction, disabled, ...props }: ActionButtonProps) => {
    return (
        <Tooltip
            side={"bottom"}
            content={label}
            trigger={
                <IconButton
                    icon={icon}
                    onClick={onAction}
                    disabled={disabled}
                    data-testid={props["data-testid"]}
                    variant={"ghost"}
                />
            }
        ></Tooltip>
    );
};
