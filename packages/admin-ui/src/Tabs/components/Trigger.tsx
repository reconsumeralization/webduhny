import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn, cva, type VariantProps } from "~/utils";
import { Icon } from "~/Icon";

const triggerVariants = cva(
    [
        "group inline-flex items-center justify-center whitespace-nowrap outline-none transition-all",
        "text-neutral-strong hover:text-neutral-primary",
        "border-b-md border-transparent border-solid",
        "data-[state=active]:border-accent-default data-[state=active]:text-neutral-primary",
        "disabled:pointer-events-none disabled:!text-neutral-disabled disabled:!fill-neutral-disabled disabled:!border-transparent"
    ],
    {
        variants: {
            size: {
                sm: "text-sm h-[40px]",
                md: "text-md h-[48px]",
                lg: "text-lg h-[56px]",
                xl: "text-xl h-[64px]"
            },
            visible: {
                false: "hidden"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

const innerTriggerVariants = cva(
    [
        "inline-flex items-center justify-start gap-xs",
        "group-hover:bg-neutral-dimmed",
        "group-focus-visible:ring-lg group-focus-visible:ring-primary-dimmed"
    ],
    {
        variants: {
            size: {
                sm: "rounded-sm p-xs",
                md: "rounded-sm px-xs py-xs-plus",
                lg: "rounded-sm px-xs-plus py-sm-plus",
                xl: "rounded-lg px-sm py-sm-plus"
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
        icon?: React.ReactElement;
        "data-testid"?: string;
    };

const Trigger = ({ className, size, icon, text, visible, ...props }: TriggerProps) => (
    <TabsPrimitive.Trigger className={cn(triggerVariants({ size, visible }), className)} {...props}>
        <div className={cn(innerTriggerVariants({ size }))}>
            {icon && <Icon icon={icon} size={"sm"} label={String(text)} color={"neutral-light"} />}
            {text}
        </div>
    </TabsPrimitive.Trigger>
);

export { Trigger, type TriggerProps };
