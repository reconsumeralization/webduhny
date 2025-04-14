import React from "react";
import { makeDecoratable } from "~/index";
import { DropdownMenu, DropdownMenuItemProps } from "@webiny/admin-ui";

const SupportMenuItemBase = (props: DropdownMenuItemProps) => {
    return <DropdownMenu.Item {...props} />;
};

export const DecoratableSupportMenuItem = makeDecoratable("SupportMenuItem", SupportMenuItemBase);

const SupportMenuItem = Object.assign(DecoratableSupportMenuItem, {
    Icon: DropdownMenu.Item.Icon
});

export { SupportMenuItem };
