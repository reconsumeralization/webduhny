import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn, cva, type VariantProps } from "~/utils";

const triggerVariants = cva(
    [
        "group inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all",
        "text-neutral-strong, fill-neutral-strong",
        "border-4 border-accent-default border-solid",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:text-neutral-disabled disabled:fill-neutral-disabled",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:fill-foreground"
    ],
    {
        variants: {
            size: {
                sm: "text-sm h-[40px]",
                md: "text-md px-xs",
                lg: "text-lg px-xs-plus",
                xl: "text-xl px-sm"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

const innerTriggerVariants = cva(
    ["group-hover:bg-neutral-dimmed group-hover:text-neutral-primary"],
    {
        variants: {
            size: {
                sm: "rounded-sm p-xs gap-xs",
                md: "rounded-sm",
                lg: "rounded-sm",
                xl: "rounded-lg"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

type TriggerProps = Omit<TabsPrimitive.TabsTriggerProps, "children"> &
    VariantProps<typeof triggerVariants> & {
        text: React.ReactNode;
        icon?: React.ReactNode;
    };

const Trigger = ({ className, size, icon, text, ...props }: TriggerProps) => (
    <TabsPrimitive.Trigger className={cn(triggerVariants({ size }), className)} {...props}>
        <div className={cn(innerTriggerVariants({ size }))}>
            {icon} {text}
        </div>
    </TabsPrimitive.Trigger>
);

export { Trigger, type TriggerProps };
