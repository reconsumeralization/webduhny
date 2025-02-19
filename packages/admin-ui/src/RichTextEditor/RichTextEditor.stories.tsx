import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "~/RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
    title: "Components/Form/RichTextEditor",
    component: RichTextEditor,
    argTypes: {
        onChange: { action: "onChange" },
        onReady: { action: "onReady" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <RichTextEditor {...args} value={value} onChange={setValue} />;
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
