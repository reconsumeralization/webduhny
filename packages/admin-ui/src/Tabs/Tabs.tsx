import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { makeDecoratable, withStaticProps } from "~/utils";
import { Content, ContentProps, List, Trigger, TriggerProps } from "./components";

const Root = TabsPrimitive.Root;

interface TabsProps extends Omit<TabsPrimitive.TabsProps, "defaultValue"> {
    triggers: React.ReactElement<TriggerProps>[];
    contents: React.ReactElement<ContentProps>[];
    size?: "sm" | "md" | "lg" | "xl";
}

const DecoratableTabs = ({
    value: baseValue,
    size = "md",
    triggers,
    contents,
    ...props
}: TabsProps) => {
    const value = baseValue || triggers.find(trigger => !trigger.props.disabled)?.props.value;

    return (
        <Root {...props} value={value}>
            <List>
                {triggers.map(trigger =>
                    React.cloneElement(trigger, { size, key: `tab-trigger-${trigger.key}` })
                )}
            </List>
            {contents.map(content => (
                <React.Fragment key={`tab-content-${content.key}`}>
                    {React.cloneElement(content)}
                </React.Fragment>
            ))}
        </Root>
    );
};

const BaseTabs = makeDecoratable("Tabs", DecoratableTabs);

const Tabs = withStaticProps(BaseTabs, {
    Trigger,
    Content
});

export { Tabs, type TabsProps };
