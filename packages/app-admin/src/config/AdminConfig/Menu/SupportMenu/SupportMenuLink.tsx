import React from "react";
import { makeDecoratable } from "~/index";
import { DropdownMenu, DropdownMenuLinkProps } from "@webiny/admin-ui";

const SupportMenuLinkBase = (props: DropdownMenuLinkProps) => {
    return <DropdownMenu.Link {...props} />;
};

const DecoratableSupportMenuLink = makeDecoratable("SupportMenuLink", SupportMenuLinkBase);

const SupportMenuLink = Object.assign(DecoratableSupportMenuLink, {
    Icon: DropdownMenu.Link.Icon
});

export { SupportMenuLink };
