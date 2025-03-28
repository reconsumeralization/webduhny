import React, { useMemo } from "react";
import { cn } from "~/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { SidebarMenuSubItemIndentation } from "./SidebarMenuSubItemIndentation";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { IconButton } from "~/Button";
import { ReactComponent as KeyboardArrowRightIcon } from "@webiny/icons/keyboard_arrow_down.svg";
import { useSidebarMenu } from "./SidebarMenuProvider";
import { type SidebarMenuItemProps } from "./SidebarMenuItem";

const SidebarMenuSubItem = ({ children, className, ...buttonProps }: SidebarMenuItemProps) => {
    const { currentLevel } = useSidebarMenu();

    const sidebarMenuSubButton = useMemo(() => {
        if (!children) {
            return (
                <>
                    <SidebarMenuSubItemIndentation
                        lvl={currentLevel}
                        variant={buttonProps.variant}
                    />
                    <SidebarMenuSubButton {...buttonProps} />
                </>
            );
        }

        const chevron = (
            <CollapsibleTrigger asChild>
                <IconButton
                    variant={"ghost"}
                    size={"xs"}
                    className={
                        "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-sub-item-collapsible:wby-rotate-180 group-data-[state=collapsed]:wby-hidden"
                    }
                    color={"neutral-strong"}
                    data-sidebar={"menu-item-expanded-indicator"}
                    icon={<KeyboardArrowRightIcon />}
                />
            </CollapsibleTrigger>
        );

        return (
            <Collapsible className="wby-w-full wby-group/menu-sub-item-collapsible">
                <div className={"wby-flex wby-items-center"}>
                    <SidebarMenuSubItemIndentation
                        lvl={currentLevel}
                        variant={buttonProps.variant}
                    />
                    <SidebarMenuSubButton {...buttonProps} action={chevron} />
                </div>
                <CollapsibleContent>
                    <SidebarMenuSub>{children}</SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }, [children, buttonProps, currentLevel]);

    return (
        <li
            data-sidebar="menu-sub-item"
            className={cn("wby-group/menu-sub-item wby-relative wby-flex", className)}
        >
            {sidebarMenuSubButton}
        </li>
    );
};

export { SidebarMenuSubItem };
