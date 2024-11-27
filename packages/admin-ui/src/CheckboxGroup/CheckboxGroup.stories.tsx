import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "~/CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
    title: "Components/CheckboxGroup",
    component: CheckboxGroup,
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
        const [values, setValues] = useState(args.values);
        return (
            <CheckboxGroup
                {...args}
                values={values}
                onCheckedChange={values => setValues(values)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
    args: {
        items: [
            {
                label: "Value 1",
                value: "value-1"
            },
            {
                label: "Value 2",
                value: "value-2"
            },
            {
                label: "Value 3",
                value: "value-3"
            }
        ],
        values: []
    }
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: "Label"
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
