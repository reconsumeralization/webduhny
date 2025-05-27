import React from "react";
import { cn } from "@webiny/admin-ui";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className, ...props }: ContainerProps) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-w-full wby-rounded-md wby-border-sm wby-border-neutral-muted wby-p-sm-extra wby-mt-xs wby-relative",
                className
            )}
        >
            {children}
        </div>
    );
};

export { Container, type ContainerProps };
