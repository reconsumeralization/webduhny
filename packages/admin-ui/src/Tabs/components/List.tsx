import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "~/utils";

type ListProps = TabsPrimitive.TabsListProps;

const List = ({ className, ...props }: ListProps) => (
    <TabsPrimitive.List
        className={cn(
            "wby-w-full wby-inline-flex wby-items-center wby-justify-start wby-gap-sm",
            className
        )}
        {...props}
    />
);

export { List, type ListProps };
