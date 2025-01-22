import React, { useMemo, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { makeDecoratable, withStaticProps } from "~/utils";
import {
    Content,
    ITabsContext,
    List,
    Tab,
    TabItem,
    TabProps,
    TabsContext,
    Trigger
} from "./components";

const Root = TabsPrimitive.Root;

interface TabsProps extends Omit<TabsPrimitive.TabsProps, "children"> {
    tabs: React.ReactElement<TabProps>[];
    size?: "sm" | "md" | "lg" | "xl";
}

const DecoratableTabs = ({
    defaultValue: initialValue,
    size = "md",
    tabs: tabComponents,
    ...props
}: TabsProps) => {
    const [tabs, setTabs] = useState<TabItem[]>([]);

    const defaultValue = useMemo(() => {
        // `defaultValue` prop works only at first render so we need to use the `tabComponents` instead of the `TabItems`
        return (
            initialValue ||
            tabComponents.find(tab => !tab.props.disabled && tab.props.visible !== false)?.props
                .value
        );
    }, [initialValue, tabComponents]);

    const triggers = useMemo(
        () => (
            // We need to generate a key like this to trigger a proper component re-render when child tabs change.
            <List key={tabs.map(tab => tab.id).join(";")}>
                {tabs.map(tab => (
                    <Trigger
                        key={tab.id}
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

    const contents = useMemo(
        () => tabs.map(tab => <Content key={tab.id} value={tab.value} content={tab.content} />),
        [tabs]
    );

    const context: ITabsContext = useMemo(
        () => ({
            addTab(props) {
                setTabs(tabs => {
                    const existingIndex = tabs.findIndex(tab => tab.value === props.value);
                    if (existingIndex > -1) {
                        return [
                            ...tabs.slice(0, existingIndex),
                            props,
                            ...tabs.slice(existingIndex + 1)
                        ];
                    }
                    return [...tabs, props];
                });
            },
            removeTab(id) {
                setTabs(tabs => tabs.filter(tab => tab.id === id));
            }
        }),
        [setTabs]
    );

    return (
        <Root {...props} defaultValue={defaultValue}>
            {triggers}
            {contents}
            <TabsContext.Provider value={context}>{tabComponents}</TabsContext.Provider>
        </Root>
    );
};

const BaseTabs = makeDecoratable("Tabs", DecoratableTabs);

const Tabs = withStaticProps(BaseTabs, {
    Tab
});

export { Tabs, type TabsProps };
