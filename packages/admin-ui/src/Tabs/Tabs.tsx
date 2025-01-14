import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { makeDecoratable, withStaticProps } from "~/utils";
import { Content, ContentProps, List, Trigger, TriggerProps } from "./components";

const Root = TabsPrimitive.Root;

interface TabsProps extends TabsPrimitive.TabsProps {
    triggers: React.ReactElement<TriggerProps>[];
    contents: React.ReactElement<ContentProps>[];
    size?: "sm" | "md" | "lg" | "xl";
}

const DecoratableTabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
    ({ defaultValue: baseDefaultValue, size = "md", triggers, contents, ...props }, ref) => {
        const defaultValue = baseDefaultValue || triggers[0].props.value;

        return (
            <Root ref={ref} defaultValue={defaultValue} {...props}>
                <List>
                    {triggers.map(trigger =>
                        React.cloneElement(trigger, { size, key: `tab-trigger-${trigger.key}` })
                    )}
                </List>
                {contents.map(content => (
                    <React.Fragment key={`tab-content-${content.key}`}>
                        {React.cloneElement(content, { size })}
                    </React.Fragment>
                ))}
            </Root>
        );
    }
);

DecoratableTabs.displayName = TabsPrimitive.Root.displayName;

const BaseTabs = makeDecoratable("Tabs", DecoratableTabs);

const Tabs = withStaticProps(BaseTabs, {
    Trigger,
    Content
});

export { Tabs, type TabsProps };
