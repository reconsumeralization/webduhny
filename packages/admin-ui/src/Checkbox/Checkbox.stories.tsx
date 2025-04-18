import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "~/Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Form/Checkbox",
    component: Checkbox,
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
        const [checked, setChecked] = useState(args.checked);
        return <Checkbox {...args} checked={checked} onChange={checked => setChecked(checked)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: "Any field label"
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
        disabled: true
    }
};

export const FullExample: Story = {
    args: {
        ...Default.args,
        label: "Any field label",
        required: true,
        description: "Provide the required information for processing your request.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "This field is required."
        }
    }
};

export const Documentation: Story = {
    args: {
        label: "Any field label",
        checked: false,
        disabled: false,
        required: false,
        description: "Provide the required information for processing your request.",
        note: "Note: Ensure your selection or input is accurate before proceeding.",
        validation: {
            isValid: false,
            message: "This field is required."
        }
    },
    argTypes: {
        label: {
            description: "Label text for the checkbox",
            control: "text",
            defaultValue: "Any field label"
        },
        checked: {
            description: "Determines if the checkbox is checked",
            control: "boolean",
            defaultValue: false
        },
        disabled: {
            description: "Disables the checkbox when set to true",
            control: "boolean",
            defaultValue: false
        },
        required: {
            description: "Makes the checkbox required when set to true",
            control: "boolean",
            defaultValue: false
        },
        description: {
            description: "Additional description text below the checkbox",
            control: "text"
        },
        note: {
            description: "Additional note text below the checkbox",
            control: "text"
        },
        validation: {
            description: "Validation state and message",
            control: "object"
        },
        onChange: {
            description: "Callback function triggered when checkbox state changes",
            control: "none"
        }
    }
};
