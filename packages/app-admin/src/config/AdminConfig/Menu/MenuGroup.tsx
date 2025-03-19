import React, { useMemo } from "react";
import { makeDecoratable } from "~/index";
import { Sidebar } from "@webiny/admin-ui";
import { BaseMenuItemProps } from "./types";

export interface MenuGroupProps
    extends BaseMenuItemProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
    onClick?: () => void;
}

const MenuGroupBase = ({ label, icon, ...rest }: MenuGroupProps) => {
    const mappedProps = useMemo(() => {
        return {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            ...rest
        };
    }, [label, icon, rest]);
    return <Sidebar.Item {...mappedProps} variant={"group-label"} />;
};

export const MenuGroup = makeDecoratable("MenuGroup", MenuGroupBase);
