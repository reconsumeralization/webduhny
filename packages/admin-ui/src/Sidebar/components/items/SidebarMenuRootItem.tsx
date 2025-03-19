import React, { useMemo } from "react";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { SidebarMenuRootButton } from "./SidebarMenuRootButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "./SidebarMenuItemAction";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { IconButton } from "~/Button";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { type SidebarMenuItemProps } from "./SidebarMenuItem";

const SidebarMenuItemBase = ({ children, className, ...buttonProps }: SidebarMenuItemProps) => {
    const sidebarMenuButton = useMemo(() => {
        if (!children) {
            return <SidebarMenuRootButton {...buttonProps} />;
        }

        const chevron = (
            <CollapsibleTrigger asChild>
                <IconButton
                    variant={"ghost"}
                    size={"xs"}
                    className={
                        "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-item-collapsible:wby-rotate-180 group-data-[state=collapsed]:wby-hidden"
                    }
                    color={"neutral-strong"}
                    data-sidebar={"menu-item-expanded-indicator"}
                    icon={<KeyboardArrowRightIcon />}
                />
            </CollapsibleTrigger>
        );

        return (
            <Collapsible className={cn("wby-w-full wby-group/menu-item-collapsible")}>
                <SidebarMenuRootButton {...buttonProps} action={chevron} />
                <CollapsibleContent
                    forceMount
                    className={"wby-hidden data-[state=open]:!wby-block"}
                >
                    <SidebarMenuSub>{children}</SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }, [children, buttonProps]);

    return (
        <li
            data-sidebar="menu-item"
            className={cn(
                "wby-group/menu-item wby-relative wby-px-xs-plus",

                // When the sidebar is collapsed, this ensures that the sidebar menu item is highlighted
                // if it contains an active child (no matter how deep in the hierarchy).
                "group-data-[state=collapsed]:[&:has([data-active=true])_[data-sidebar=menu-button]_svg]:!wby-fill-neutral-xstrong",
                "group-data-[state=collapsed]:[&:has([data-active=true])_[data-sidebar=menu-button]]:!wby-bg-neutral-dark/5",
                className
            )}
        >
            {sidebarMenuButton}
        </li>
    );
};

const DecoratableSidebarMenuItem = makeDecoratable("SidebarMenuItem", SidebarMenuItemBase);

const SidebarMenuRootItem = withStaticProps(DecoratableSidebarMenuItem, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export { SidebarMenuRootItem, type SidebarMenuItemProps };
