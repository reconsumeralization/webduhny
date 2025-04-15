import React from "react";
import { cn, Heading } from "@webiny/admin-ui";

interface PermissionsGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
}

const PermissionsGroup = ({ className, children, title, ...props }: PermissionsGroupProps) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-mb-lg wby-p-md-extra wby-border-sm wby-border-neutral-dimmed wby-rounded-lg",
                className
            )}
        >
            <Heading level={6} className={"wby-mb-sm"}>
                {title}
            </Heading>
            {children}
        </div>
    );
};

export { PermissionsGroup, type PermissionsGroupProps };
