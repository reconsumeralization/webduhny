import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "~/Form";

const meta: Meta<typeof Switch> = {
    title: "Components/Form/Switch",
    component: Switch,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-1/3 h-64 mx-auto flex justify-center items-center">
                <div className="w-full">
                    <Story />
                </div>
            </div>
        )
    ],
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

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference."
    }
};

export const WithNotes: Story = {
    args: {
        ...Default.args,
        note: "Note: Please do not use your middle name."
    }
};

export const WithErrors: Story = {
    args: {
        ...Default.args,
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};

export const FullExample: Story = {
    args: {
        ...Default.args,
        label: "First and Last name",
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        note: "Note: Please do not use your middle name.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};
