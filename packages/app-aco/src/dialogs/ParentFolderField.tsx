import React from "react";
import { cn, FormComponentLabel } from "@webiny/admin-ui";

type ParentFolderFieldProps = React.HTMLAttributes<HTMLDivElement> & {
    label?: React.ReactNode;
};

const ParentFolderField = ({
    children,
    label = "Parent folder",
    ...props
}: ParentFolderFieldProps) => {
    return (
        <div {...props}>
            <FormComponentLabel text={label} />
            <div
                className={cn([
                    "wby-px-sm-extra wby-py-sm-extra",
                    "wby-border-sm wby-border-neutral-muted wby-rounded-md",
                    "wby-bg-neutral-base",
                    "wby-max-h-[280px] wby-overflow-x-hidden wby-overflow-y-scroll"
                ])}
            >
                {children}
            </div>
        </div>
    );
};

export { ParentFolderField, type ParentFolderFieldProps };
