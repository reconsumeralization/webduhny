import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "~/Textarea";

const meta: Meta<typeof Textarea> = {
    title: "Components/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Label"
    }
};

export const WithLabelRequired: Story = {
    args: {
        label: "Label",
        required: true
    }
};

export const WithValue: Story = {
    args: {
        value: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating estimation and other evidence, Earth formed 4.5 billion years ago."
    }
};

export const WithDescription: Story = {
    args: {
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference."
    }
};

export const WithNotes: Story = {
    args: {
        note: "Note: Please do not use your middle name."
    }
};

export const WithErrors: Story = {
    args: {
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};

export const FullExample: Story = {
    args: {
        label: "First and Last name",
        required: true,
        placeholder: "John Doe",
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        note: "Note: Please do not use your middle name.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};
