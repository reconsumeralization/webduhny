import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
    title: "Components/Switch",
    component: Switch,
    tags: ["autodocs"],
    render: args => {
        const [checked, setChecked] = useState(args.checked);
        return <Switch {...args} checked={checked} onCheckedChange={value => setChecked(value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        label: "Label"
    }
};

export const WithLeadingLabel: Story = {
    args: {
        label: "Leading label",
        labelPosition: "start"
    }
};

export const WithTrailingLabel: Story = {
    args: {
        label: "Trailing label",
        labelPosition: "end"
    }
};

export const Checked: Story = {
    args: {
        checked: true
    }
};

export const Disabled: Story = {
    args: {
        label: "Label",
        disabled: true
    }
};
