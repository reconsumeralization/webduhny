import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {
        disabled: { control: "boolean" },
        checked: { control: "boolean" },
        indeterminate: { control: "boolean" }
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: "label"
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
