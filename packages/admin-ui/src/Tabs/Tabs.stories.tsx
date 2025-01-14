import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as PersonIcon } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as LockIcon } from "@material-design-icons/svg/outlined/lock.svg";

import { Tabs } from "./Tabs";
import * as React from "react";

const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg", "xl"] }
    }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        triggers: [
            <Tabs.Trigger key="account" value="account" text={"Account"} />,
            <Tabs.Trigger key="password" value="password" text={"Password"} />
        ],
        contents: [
            <Tabs.Content
                key="account"
                value="account"
                content={"Make changes to your account here."}
            />,
            <Tabs.Content key="password" value="password" content={"Change your password here."} />
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

export const WithTriggerIcons: Story = {
    args: {
        ...Default.args,
        triggers: [
            <Tabs.Trigger key="account" value="account" text={"Account"} icon={<PersonIcon />} />,
            <Tabs.Trigger key="password" value="password" text={"Password"} icon={<LockIcon />} />
        ]
    }
};

export const WithDisabledTrigger: Story = {
    args: {
        ...Default.args,
        triggers: [
            <Tabs.Trigger key="account" value="account" text={"Account"} disabled={true} />,
            <Tabs.Trigger key="password" value="password" text={"Password"} />
        ]
    }
};
