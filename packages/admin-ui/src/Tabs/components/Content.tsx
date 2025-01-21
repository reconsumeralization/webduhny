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
                "focus-visible:outline-none focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                // By default, the inner content is removed by the DOM when the tab becomes inactive.
                // This is a problem when we need to keep track of the state inside a tab content, such as forms.
                //  We are force-mounting the tab content and this class ensures the content is hidden, but not removed from the DOM.
                "data-[state=inactive]:hidden"
            ],
            className
        )}
        forceMount={true}
        {...props}
    >
        {content}
    </TabsPrimitive.Content>
);

export { Content, type ContentProps };
