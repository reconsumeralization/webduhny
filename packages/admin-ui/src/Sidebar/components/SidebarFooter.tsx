import React from "react";
import { Separator } from "~/Separator";

const SidebarFooter = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div data-sidebar="footer" {...props}>
            <div className={"wby-px-sm wby-pb-xs"}>
                <Separator variant={"subtle"} margin={"none"} className={"wby-mb-px"} />
            </div>
            {children}
        </div>
    );
};

export { SidebarFooter };
