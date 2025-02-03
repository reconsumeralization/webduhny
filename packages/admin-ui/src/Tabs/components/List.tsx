import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn, cva, type VariantProps } from "~/utils";

const tabListVariants = cva("wby-w-full wby-inline-flex wby-items-center wby-justify-start", {
    variants: {
        size: {
            sm: "wby-gap-sm",
            md: "wby-gap-sm",
            lg: "wby-gap-sm-extra",
            xl: "wby-gap-sm-extra"
        },
        gutter: {
            xs: "wby-px-xs",
            sm: "wby-px-sm",
            md: "wby-px-md",
            lg: "wby-px-lg",
            xl: "wby-px-xl",
            xxl: "wby-px-xxl"
        },
        separator: {
            true: "wby-border-solid wby-border-b-sm wby-border-neutral-muted"
        }
    },
    defaultVariants: {
        size: "sm"
    }
});

type ListProps = TabsPrimitive.TabsListProps & VariantProps<typeof tabListVariants>;

const List = ({ className, gutter, size, separator, ...props }: ListProps) => (
    <TabsPrimitive.List
        className={cn(tabListVariants({ gutter, size, separator }), className)}
        {...props}
    />
);

export { List, type ListProps, tabListVariants };
