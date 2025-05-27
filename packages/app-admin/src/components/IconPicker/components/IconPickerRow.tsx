import React from "react";
import { cn } from "@webiny/admin-ui";

type IconPickerRowProps = React.ButtonHTMLAttributes<HTMLDivElement>;

const IconPickerRow = ({ children, className, ...props }: IconPickerRowProps) => {
    return (
        <div {...props} className={cn("wby-flex wby-items-center wby-gap-sm", className)}>
            {children}
        </div>
    );
};

export { IconPickerRow, type IconPickerRowProps };
