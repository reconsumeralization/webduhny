import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { makeDecoratable } from "~/utils";
import { Content, List, Trigger } from "./components";

const Root = TabsPrimitive.Root;

interface Tab extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "content"> {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactElement;
    disabled?: boolean;
    visible?: boolean;
    "data-testid"?: string;
}

interface TabsProps extends Omit<TabsPrimitive.TabsProps, "children"> {
    tabs: Tab[];
    size?: "sm" | "md" | "lg" | "xl";
}

const DecoratableTabs = ({
    defaultValue: baseDefaultValue,
    size = "md",
    tabs,
    ...props
}: TabsProps) => {
    const defaultValue = React.useMemo(
        () => baseDefaultValue || tabs.find(tab => !tab.disabled && tab.visible !== false)?.value,
        [baseDefaultValue, tabs]
    );

    const triggers = React.useMemo(
        () => (
            <List>
                {tabs.map((tab, index) => (
                    <Trigger
                        key={`${tab.value}-${index}`}
                        value={tab.value}
                        text={tab.trigger}
                        icon={tab.icon}
                        disabled={tab.disabled}
                        visible={tab.visible}
                        size={size}
                        data-testid={tab["data-testid"]}
                    />
                ))}
            </List>
        ),
        [tabs, size]
    );

    const contents = React.useMemo(
        () =>
            tabs.map((tab, index) => (
                <Content key={`${tab.value}-${index}`} value={tab.value} content={tab.content} />
            )),
        [tabs]
    );

    return (
        <Root {...props} defaultValue={defaultValue}>
            {triggers}
            {contents}
        </Root>
    );
};

const Tabs = makeDecoratable("Tabs", DecoratableTabs);

export { Tabs, type TabsProps, type Tab };
