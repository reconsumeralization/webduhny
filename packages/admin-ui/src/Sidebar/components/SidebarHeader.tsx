import React from "react";
import { Separator } from "~/Separator";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as OpenSidebarIcon } from "@webiny/icons/keyboard_double_arrow_right.svg";
import { ReactComponent as CloseSidebarIcon } from "@webiny/icons/chrome_reader_mode.svg";

interface SidebarHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
}

const SidebarHeader = ({ title, icon }: SidebarHeaderProps) => {
    const { toggleSidebar, open } = useSidebar();

    // We needed this to ensure smooth transition when closing the sidebar. Basically, when clicking
    // on the sidebar, for a super brief amount of time, users would still see the "expand" icon,
    // which should not be the case. This state is used to prevent that.
    // It's kind of a hack because I've tried multiple CSS classes-based approaches, and could not get
    // it to work properly. To improve this and making look less hacky, I'd actually move this feature
    // into the `useSidebar` hook and have it be centralized there. Wanted to do it but I've already
    // spent a ton of time on this, so I decided to just leave it.
    const [closingInProgress, setClosingInProgress] = React.useState(false);

    return (
        <>
            <div className={"wby-px-xs-plus"}>
                <div
                    data-sidebar="header"
                    className={
                        "wby-flex wby-justify-between wby-items-center wby-gap-sm wby-py-xs-plus wby-px-xs wby-overflow-x-hidden"
                    }
                >
                    <div className={"wby-flex wby-items-center wby-gap-x-sm"}>
                        <div className={"wby-flex wby-flex-shrink-0"}>{icon}</div>

                        <span className={"wby-text-md wby-font-semibold wby-truncate"}>
                            {title}
                        </span>
                        {!closingInProgress && (
                            <IconButton
                                className={
                                    "wby-absolute wby-right-[-10px] wby-hidden group-data-[state=collapsed]:group-hover:wby-flex"
                                }
                                icon={<OpenSidebarIcon />}
                                data-sidebar="trigger"
                                size="xs"
                                variant={"secondary"}
                                onClick={toggleSidebar}
                            />
                        )}
                    </div>

                    {open && (
                        <IconButton
                            icon={<CloseSidebarIcon />}
                            data-sidebar="trigger"
                            size="xs"
                            variant={"ghost"}
                            onClick={() => {
                                setClosingInProgress(true);
                                setTimeout(() => {
                                    setClosingInProgress(false);
                                }, 200);

                                toggleSidebar();
                            }}
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
