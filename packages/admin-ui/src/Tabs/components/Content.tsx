import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn, cva, type VariantProps } from "~/utils";

const contentVariants = cva(
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-muted",
    {
        variants: {
            size: {
                sm: "text-xs p-2",
                md: "text-sm p-4",
                lg: "text-lg p-6",
                xl: "text-xl p-8"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

type ContentProps = Omit<TabsPrimitive.TabsContentProps, "children"> &
    VariantProps<typeof contentVariants> & {
        content: React.ReactNode;
    };

const Content = ({ className, size, content, ...props }: ContentProps) => (
    <TabsPrimitive.Content className={cn(contentVariants({ size }), className)} {...props}>
        {content}
    </TabsPrimitive.Content>
);

export { Content, type ContentProps };
