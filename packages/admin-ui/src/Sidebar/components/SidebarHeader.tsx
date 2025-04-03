import React from "react";
import { Separator } from "~/Separator";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as PinSidebarIcon } from "@webiny/icons/push_pin.svg";
import { ReactComponent as UnpinSidebarIcon } from "@webiny/icons/push_pin_off.svg";
import { Tooltip } from "~/Tooltip";

interface SidebarHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
}

const SidebarHeader = ({ title, icon }: SidebarHeaderProps) => {
    const { togglePinned, expanded, pinned } = useSidebar();

    return (
        <>
            <div className={"wby-px-xs-plus"}>
                <div
                    data-sidebar="header"
                    className={
                        "wby-flex wby-justify-between wby-items-center wby-gap-sm wby-py-xs-plus wby-px-xs wby-overflow-x-hidden"
                    }
                >
                    <div
                        className={
                            "wby-flex wby-items-center wby-gap-x-sm [&_a]:!wby-no-underline [&_a]:!wby-text-neutral-primary"
                        }
                    >
                        <div className={"wby-flex wby-flex-shrink-0"}>{icon}</div>

                        <span className={"wby-text-md wby-font-semibold wby-truncate"}>
                            {title}
                        </span>
                    </div>

                    {expanded && (
                        <Tooltip
                            side={"right"}
                            trigger={
                                <IconButton
                                    icon={pinned ? <UnpinSidebarIcon /> : <PinSidebarIcon />}
                                    data-sidebar="trigger"
                                    size="xs"
                                    variant={"ghost"}
                                    onClick={togglePinned}
                                />
                            }
                            content={pinned ? "Unpin" : "Pin"}
                        />
                    )}
                </div>
            </div>
            <div className={"wby-px-sm wby-py-xs"}>
                <Separator variant={"subtle"} margin={"none"} className={"wby-mb-px"} />
            </div>
        </>
    );
};

export { SidebarHeader, type SidebarHeaderProps };
