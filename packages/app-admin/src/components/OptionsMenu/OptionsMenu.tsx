import React, { Fragment } from "react";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { IconButton, DropdownMenu } from "@webiny/admin-ui";
import { OptionsMenuItemProvider } from "./useOptionsMenuItem";

export interface OptionsMenuProps {
    actions: {
        name: string;
        element: React.ReactElement;
    }[];
    trigger?: React.ReactElement;
    ["data-testid"]?: string;
}

export const OptionsMenu = (props: OptionsMenuProps) => {
    if (!props.actions.length) {
        return null;
    }

    const trigger = props.trigger || (
        <IconButton
            icon={<MoreVerticalIcon />}
            size={"sm"}
            iconSize={"lg"}
            variant={"ghost"}
            data-testid={props["data-testid"] || "more-options-icon"}
        />
    );

    return (
        <DropdownMenu trigger={trigger}>
            {props.actions.map(action => (
                <Fragment key={action.name}>
                    <OptionsMenuItemProvider>{action.element}</OptionsMenuItemProvider>
                </Fragment>
            ))}
        </DropdownMenu>
    );
};
