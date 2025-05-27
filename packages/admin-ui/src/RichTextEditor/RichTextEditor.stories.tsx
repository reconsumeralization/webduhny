import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";
import { type RichTextEditorValue } from "./RichTextEditorPrimitive";

const meta: Meta<typeof RichTextEditor> = {
    title: "Components/Form/RichTextEditor",
    component: RichTextEditor,
    argTypes: {
        onChange: { action: "onChange" },
        onReady: { action: "onReady" },
        disabled: {
            control: "boolean",
            defaultValue: false
        }
    },
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Any field label"
    }
};

export const WithLabelRequired: Story = {
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
    render: args => {
        const [value, setValue] = useState<RichTextEditorValue | undefined>(args.value);
        const [validation, setValidation] = useState({ isValid: true, message: "" });

        // Update value when args.value changes
        useEffect(() => {
            setValue(args.value);
        }, [args.value]);

        const handleChange = (newValue: RichTextEditorValue) => {
            setValue(newValue);

            // Simple required validation
            if (args.required && (!newValue || newValue.length === 0)) {
                setValidation({ isValid: false, message: "This field is required" });
            } else {
                setValidation({ isValid: true, message: "" });
            }
        };

        // Validate on required change or value change
        useEffect(() => {
            if (args.required && (!value || value.length === 0)) {
                setValidation({ isValid: false, message: "This field is required" });
            } else {
                setValidation({ isValid: true, message: "" });
            }
        }, [args.required, value]);

        return (
            <RichTextEditor
                {...args}
                value={value}
                onChange={handleChange}
                validation={validation}
                required={args.required}
            />
        );
    },
    args: {
        label: "Content Editor",
        required: true,
        disabled: false,
        description: "Enter the content for your page or post",
        note: "Use the toolbar to format your text and add media",
        validation: undefined,
        value: undefined,
        onChange: undefined,
        onReady: undefined
    },
    argTypes: {
        label: {
            description: "Label text for the rich text editor",
            control: "text"
        },
        required: {
            description: "Makes the field required when set to true",
            control: "boolean"
        },
        disabled: {
            description: "Disables the rich text editor when set to true",
            control: "boolean"
        },
        description: {
            description: "Additional description text below the field",
            control: "text"
        },
        note: {
            description: "Additional note text below the field",
            control: "text"
        },
        value: {
            description: "The editor content",
            control: "object"
        },
        validation: {
            description: "Object containing validation state and message",
            control: "object"
        },
        onChange: {
            description: "Function called when the content changes",
            control: "none"
        },
        onReady: {
            description: "Function called when the editor is ready",
            control: "none"
        }
    }
};
