import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as PersonIcon } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as LockIcon } from "@material-design-icons/svg/outlined/lock.svg";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",
    component: Tabs,
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        tabs: [
            <Tabs.Tab
                key={"account"}
                value={"account"}
                trigger={"Account"}
                content={
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum."
                }
            />,
            <Tabs.Tab
                key={"password"}
                value={"password"}
                trigger={"Password"}
                content={
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. "
                }
            />
        ]
    }
};

export const SizeSmall: Story = {
    args: {
        ...Default.args,
        size: "sm"
    }
};

export const SizeMedium: Story = {
    args: {
        ...Default.args,
        size: "md"
    }
};

export const SizeLarge: Story = {
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const SizeExtraLarge: Story = {
    args: {
        ...Default.args,
        size: "xl"
    }
};

export const GutterExtraSmall: Story = {
    args: {
        ...Default.args,
        gutter: "xs"
    }
};

export const GutterSmall: Story = {
    args: {
        ...Default.args,
        gutter: "sm"
    }
};

export const GutterMedium: Story = {
    args: {
        ...Default.args,
        gutter: "md"
    }
};

export const GutterLarge: Story = {
    args: {
        ...Default.args,
        gutter: "lg"
    }
};

export const GutterExtraLarge: Story = {
    args: {
        ...Default.args,
        gutter: "xl"
    }
};

export const GutterDoubleExtraLarge: Story = {
    args: {
        ...Default.args,
        gutter: "xxl"
    }
};

export const WithSeparator: Story = {
    args: {
        ...Default.args,
        separator: true
    }
};

export const WithDefaultValue: Story = {
    args: {
        ...Default.args,
        defaultValue: "password"
    }
};

export const WithControlledValue: Story = {
    args: {
        ...Default.args,
        value: "password"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Tabs {...args} value={value} onValueChange={setValue} />;
    }
};

export const WithIcons: Story = {
    args: {
        ...Default.args,
        tabs: [
            <Tabs.Tab
                key={"account"}
                value={"account"}
                trigger={"Account"}
                content={
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum."
                }
                icon={<PersonIcon />}
            />,
            <Tabs.Tab
                key={"password"}
                value={"password"}
                trigger={"Password"}
                content={
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. "
                }
                icon={<LockIcon />}
            />
        ]
    }
};

export const WithDisabledTab: Story = {
    args: {
        ...Default.args,
        tabs: [
            <Tabs.Tab
                key={"account"}
                value={"account"}
                trigger={"Account"}
                content={
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum."
                }
                disabled={true}
            />,
            <Tabs.Tab
                key={"password"}
                value={"password"}
                trigger={"Password"}
                content={
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. "
                }
            />
        ]
    }
};

export const WithHiddenTab: Story = {
    args: {
        ...Default.args,
        tabs: [
            <Tabs.Tab
                key={"account"}
                value={"account"}
                trigger={"Account"}
                content={
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum."
                }
                visible={false}
            />,
            <Tabs.Tab
                key={"password"}
                value={"password"}
                trigger={"Password"}
                content={
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. "
                }
            />
        ]
    }
};
