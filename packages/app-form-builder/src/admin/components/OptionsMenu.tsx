import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { DropdownMenu, IconButton } from "@webiny/admin-ui";

export interface OptionsMenuItem {
    label: string;
    icon: React.ReactElement;
    onClick: () => void;
    disabled?: boolean;
    "data-testid"?: string;
}

export interface OptionsMenuProps {
    items: OptionsMenuItem[];
    "data-testid"?: string;
}

export const OptionsMenu = makeDecoratable(
    "OptionsMenu",
    ({ items, ...props }: OptionsMenuProps) => {
        if (!items.length) {
            return null;
        }

        return (
            <DropdownMenu
                trigger={
                    <IconButton
                        size={"sm"}
                        variant={"ghost"}
                        icon={<MoreVerticalIcon />}
                        data-testid={props["data-testid"]}
                    />
                }
            >
                {items.map(item => (
                    <DropdownMenu.Item
                        key={item.label}
                        disabled={item.disabled ?? false}
                        onClick={item.onClick}
                        data-testid={item["data-testid"]}
                        text={item.label}
                        icon={<DropdownMenu.Item.Icon element={item.icon} label={item.label} />}
                    />
                ))}
            </DropdownMenu>
        );
    }
);
