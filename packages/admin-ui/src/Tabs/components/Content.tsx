import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "~/utils";

type ContentProps = Omit<TabsPrimitive.TabsContentProps, "children" | "content"> & {
    content: React.ReactNode;
};

const Content = ({ className, content, ...props }: ContentProps) => (
    <TabsPrimitive.Content
        className={cn(
            [
                "bg-transparent",
                "focus-visible:outline-none focus-visible:ring-lg focus-visible:ring-primary-dimmed"
            ],
            className
        )}
        {...props}
    >
        {content}
    </TabsPrimitive.Content>
);

export { Content, type ContentProps };
