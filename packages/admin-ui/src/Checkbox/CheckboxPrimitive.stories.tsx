import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxPrimitive } from "./CheckboxPrimitive";

const meta: Meta<typeof CheckboxPrimitive> = {
    title: "Components/Form Primitives/Checkbox",
    component: CheckboxPrimitive,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [checked, setChecked] = useState(args.checked);
        return (
            <CheckboxPrimitive
                {...args}
                checked={checked}
                onCheckedChange={checked => setChecked(checked)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof CheckboxPrimitive>;

export const Default: Story = {
    args: {
        label: "Label"
    }
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true
    }
};

export const Indeterminate: Story = {
    args: {
        ...Default.args,
        indeterminate: true
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};
