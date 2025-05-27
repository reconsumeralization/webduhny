import React from "react";
import { cn } from "@webiny/admin-ui";

interface TreeItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TreeItemContent = ({ children, className, ...props }: TreeItemContentProps) => {
    return (
        <div className={cn("wby-flex wby-items-center wby-w-full", className)} {...props}>
            {children}
        </div>
    );
};

export { TreeItemContent, type TreeItemContentProps };
