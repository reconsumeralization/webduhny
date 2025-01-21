import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "~/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { makeDecoratable } from "@webiny/react-composition";

const TabsRoot = TabsPrimitive.Root;

/**
 * Tabs list
 */
const TabsListBase = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "wby-w-full wby-inline-flex wby-items-center wby-justify-start wby-bg-muted wby-fill-muted-foreground wby-p-1 wby-text-muted-foreground",
            className
        )}
        {...props}
    />
));
TabsListBase.displayName = TabsPrimitive.List.displayName;

const TabsList = makeDecoratable("TabsList", TabsListBase);

/**
 * Tabs trigger
 */
const tabsTriggerVariants = cva(
    "wby-inline-flex wby-items-center wby-justify-center wby-whitespace-nowrap wby-rounded-sm wby-font-medium wby-ring-offset-background wby-transition-all wby-focus-visible:outline-none wby-focus-visible:ring-2 wby-focus-visible:ring-ring wby-focus-visible:ring-offset-2 wby-disabled:pointer-events-none wby-disabled:opacity-50 wby-data-[state=active]:bg-background wby-data-[state=active]:text-foreground wby-data-[state=active]:fill-foreground wby-data-[state=active]:shadow-sm",
    {
        variants: {
            size: {
                sm: "wby-text-xs wby-px-2 wby-py-1",
                md: "wby-text-sm wby-px-3 wby-py-1.5",
                lg: "wby-text-lg wby-px-4 wby-py-2",
                xl: "wby-text-xl wby-px-6 wby-py-3"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

type TabsTriggerProps = Omit<TabsPrimitive.TabsTriggerProps, "children"> &
    VariantProps<typeof tabsTriggerVariants> & {
        text: React.ReactNode;
        icon?: React.ReactNode;
    };

const TabsTriggerBase = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({ className, size, icon, text, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({ size }), className)}
        {...props}
    >
        {text} {icon}
    </TabsPrimitive.Trigger>
));
TabsTriggerBase.displayName = TabsPrimitive.Trigger.displayName;

const TabsTrigger = makeDecoratable("TabsTrigger", TabsTriggerBase);

/**
 * Tabs content
 */
const tabsContentVariants = cva(
    "wby-ring-offset-background wby-focus-visible:outline-none wby-focus-visible:ring-2 wby-focus-visible:ring-ring wby-focus-visible:ring-offset-2 wby-bg-muted",
    {
        variants: {
            size: {
                sm: "wby-text-xs wby-p-2",
                md: "wby-text-sm wby-p-4",
                lg: "wby-text-lg wby-p-6",
                xl: "wby-text-xl wby-p-8"
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);

type TabsContentProps = Omit<TabsPrimitive.TabsContentProps, "children"> &
    VariantProps<typeof tabsContentVariants> & {
        text: React.ReactNode;
    };

const TabsContentBase = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    TabsContentProps
>(({ className, size, text, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(tabsContentVariants({ size }), className)}
        {...props}
    >
        {text}
    </TabsPrimitive.Content>
));
TabsContentBase.displayName = TabsPrimitive.Content.displayName;

const TabsContent = makeDecoratable("TabsContent", TabsContentBase);

/**
 * Tabs
 */
interface TabsProps extends TabsPrimitive.TabsProps {
    triggers: React.ReactElement<TabsTriggerProps>[];
    contents: React.ReactElement<TabsContentProps>[];
    size?: "sm" | "md" | "lg" | "xl";
}

const TabsBase = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
    ({ defaultValue: baseDefaultValue, size = "md", triggers, contents, ...props }, ref) => {
        const defaultValue = baseDefaultValue || triggers[0].props.value;

        return (
            <TabsRoot ref={ref} defaultValue={defaultValue} {...props}>
                <TabsList>
                    {triggers.map(trigger =>
                        React.cloneElement(trigger, { size, key: `tab-trigger-${trigger.key}` })
                    )}
                </TabsList>
                {contents.map(content => (
                    <React.Fragment key={`tab-content-${content.key}`}>
                        {React.cloneElement(content, { size })}
                    </React.Fragment>
                ))}
            </TabsRoot>
        );
    }
);
TabsBase.displayName = TabsPrimitive.Root.displayName;

const Tabs = makeDecoratable("Tabs", TabsBase);

export { Tabs, TabsProps, TabsContent, TabsContentProps, TabsTrigger, type TabsTriggerProps };
