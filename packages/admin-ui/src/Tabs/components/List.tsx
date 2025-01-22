import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "~/utils";

type ListProps = TabsPrimitive.TabsListProps;

const List = ({ className, ...props }: ListProps) => (
    <TabsPrimitive.List
        className={cn("w-full inline-flex items-center justify-start gap-sm", className)}
        {...props}
    />
);

export { List, type ListProps };
