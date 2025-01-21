import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as PersonIcon } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as LockIcon } from "@material-design-icons/svg/outlined/lock.svg";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        tabs: [
            {
                value: "account",
                trigger: "Account",
                content:
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum."
            },
            {
                value: "password",
                trigger: "Password",
                content:
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec."
            }
        ]
    }
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: "sm"
    }
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: "md"
    }
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const ExtraLarge: Story = {
    args: {
        ...Default.args,
        size: "xl"
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
            {
                value: "account",
                trigger: "Account",
                content:
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum.",
                icon: <PersonIcon />
            },
            {
                value: "password",
                trigger: "Password",
                content:
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec.",
                icon: <LockIcon />
            }
        ]
    }
};

export const WithDisabledTab: Story = {
    args: {
        ...Default.args,
        tabs: [
            {
                value: "account",
                trigger: "Account",
                content:
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum.",
                disabled: true
            },
            {
                value: "password",
                trigger: "Password",
                content:
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec."
            }
        ]
    }
};

export const WithHiddenTab: Story = {
    args: {
        ...Default.args,
        tabs: [
            {
                value: "account",
                trigger: "Account",
                content:
                    "Account content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum.",
                visible: false
            },
            {
                value: "password",
                trigger: "Password",
                content:
                    "Password content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero nec libero lacinia fermentum. Nullam nec nunc nec libero lacinia fermentum. Nullam nec."
            }
        ]
    }
};
