import React, { useMemo } from "react";
import { makeDecoratable } from "~/index";
import { Sidebar } from "@webiny/admin-ui";
import { useLocation } from "@webiny/react-router";
import { type BaseMenuItemProps } from "./types";

export interface MenuLinkProps extends BaseMenuItemProps, React.HTMLAttributes<HTMLAnchorElement> {
    path: string;
}

const MenuLinkBase = ({ label, icon, path, ...rest }: MenuLinkProps) => {
    const location = useLocation();

    const mappedProps = useMemo(() => {
        return {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            to: path,
            ...rest
        };
    }, [label, icon, rest]);

    return <Sidebar.Item {...mappedProps} active={location.pathname === mappedProps.to} />;
};

export const MenuLink = makeDecoratable("MenuLink", MenuLinkBase);
