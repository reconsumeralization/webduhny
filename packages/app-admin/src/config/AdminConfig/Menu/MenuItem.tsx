import React, { useMemo } from "react";
import { makeDecoratable } from "~/index";
import { Sidebar } from "@webiny/admin-ui";
import { type BaseMenuItemProps } from "./types";

export interface MenuItemProps
    extends BaseMenuItemProps,
        Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
    onClick?: () => void;
}

const MenuLinkBase = ({ label, icon, ...rest }: MenuItemProps) => {
    const mappedProps = useMemo(() => {
        return {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            ...rest
        };
    }, [label, icon, rest]);

    return <Sidebar.Item {...mappedProps} />;
};

export const MenuItem = makeDecoratable("MenuItem", MenuLinkBase);
