import React from "react";
import { Separator } from "~/Separator";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as PinSidebarIcon } from "@webiny/icons/chrome_reader_mode.svg";
import { ReactComponent as UnpinSidebarIcon } from "@webiny/icons/width_full.svg";
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
                            "wby-flex wby-items-center wby-gap-x-sm [&_a]:!wby-no-underline [&_a]:!wby-text-neutral-primary wby-truncate"
                        }
                    >
                        <div className={"wby-flex wby-flex-shrink-0"}>{icon}</div>

                        <span className={"wby-text-md wby-font-semibold wby-truncate"}>
                            {title}
                        </span>
                    </div>

                    {expanded && (
                        <div className={"wby-size-md"}>
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
                                content={pinned ? "Unlock sidebar" : "Lock sidebar open"}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={"wby-px-sm wby-py-xs"}>
                <Separator className={"wby-mb-px"} />
            </div>
        </>
    );
};

export { SidebarHeader, type SidebarHeaderProps };
