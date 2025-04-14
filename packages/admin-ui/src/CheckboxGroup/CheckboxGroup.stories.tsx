import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "~/CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
    title: "Components/Form/CheckboxGroup",
    component: CheckboxGroup,
    argTypes: {
        disabled: {
            control: "boolean",
            defaultValue: false
        }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [values, setValues] = useState(args.values);
        return <CheckboxGroup {...args} values={values} onChange={values => setValues(values)} />;
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
        label: "Any field label"
    }
};

export const WithRequiredLabel: Story = {
    args: {
        ...Default.args,
        label: "Any field label",
        required: true
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description: "Provide the required information for processing your request."
    }
};

export const WithNotes: Story = {
    args: {
        ...Default.args,
        note: "Note: Ensure your selection or input is accurate before proceeding."
    }
};

export const WithErrors: Story = {
    args: {
        ...Default.args,
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        label: "Any field label",
        items: [
            {
                label: "Value 1",
                value: "value-1",
                disabled: true
            },
            {
                label: "Value 2",
                value: "value-2",
                disabled: true
            },
            {
                label: "Value 3",
                value: "value-3",
                disabled: true
            }
        ],
        disabled: true
    }
};

export const FullExample: Story = {
    args: {
        ...Default.args,
        label: "Select which deploy option do you prefer",
        required: true,
        description:
            "Deployment option is simly a way of parsing the data based on your database settings.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "You must select at least one of the items!"
        }
    }
};
