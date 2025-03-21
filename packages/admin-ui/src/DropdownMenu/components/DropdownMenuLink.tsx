import React from "react";
import { DropdownMenuItem, type DropdownMenuItemLinkProps } from "./DropdownMenuItem";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DropdownMenuItemIcon } from "./DropdownMenuItemIcon";

export type DropdownMenuLinkProps = DropdownMenuItemLinkProps;

const DropdownMenuLinkBase = (props: DropdownMenuLinkProps) => {
    return <DropdownMenuItem {...props} />;
};

const DecoratableDropdownMenuLink = makeDecoratable("DropdownMenuLink", DropdownMenuLinkBase);

const DropdownMenuLink = withStaticProps(DecoratableDropdownMenuLink, {
    Icon: DropdownMenuItemIcon
});

export { DropdownMenuLink, type DropdownMenuItemLinkProps };
