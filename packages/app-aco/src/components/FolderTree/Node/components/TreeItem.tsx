import React from "react";
import { cn, cva, type VariantProps } from "@webiny/admin-ui";

const treeItemVariants = cva(
    [
        "wby-group",
        "wby-relative",
        "wby-flex wby-items-center wby-gap-xs",
        "wby-px-sm wby-py-xs-plus wby-rounded-md",
        "wby-text-neutral-primary",
        "wby-cursor-pointer",
        "hover:wby-bg-neutral-dark/5"
    ],
    {
        variants: {
            active: {
                true: "wby-bg-neutral-dark/5 wby-font-semibold"
            }
        }
    }
);

type TreeItemProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof treeItemVariants>;

const TreeItem = ({ children, className, active, ...props }: TreeItemProps) => {
    return (
        <div className={"wby-mb-xs"}>
            <div {...props} className={cn(treeItemVariants({ active }), className)}>
                {children}
            </div>
        </div>
    );
};

export { TreeItem, type TreeItemProps };
