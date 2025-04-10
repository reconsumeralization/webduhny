import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconPicker } from "~/IconPicker";

const meta: Meta<typeof IconPicker> = {
    title: "Components/Form/IconPicker",
    component: IconPicker,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" },
        disabled: {
            control: "boolean",
            defaultValue: false
        }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <IconPicker {...args} value={value} onChange={setValue} />;
    }
};

// @ts-expect-error
library.add(fas);

export default meta;
type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {
    args: {
        icons: [
            { prefix: "fas", name: "trash-restore-alt" },
            { prefix: "fas", name: "trash-can-arrow-up" },
            { prefix: "fas", name: "naira-sign" },
            { prefix: "fas", name: "cart-arrow-down" },
            { prefix: "fas", name: "walkie-talkie" },
            { prefix: "fas", name: "file-edit" },
            { prefix: "fas", name: "file-pen" },
            { prefix: "fas", name: "receipt" },
            { prefix: "fas", name: "pen-square" },
            { prefix: "fas", name: "pencil-square" },
            { prefix: "fas", name: "square-pen" },
            { prefix: "fas", name: "suitcase-rolling" },
            { prefix: "fas", name: "person-circle-exclamation" },
            { prefix: "fas", name: "chevron-down" },
            { prefix: "fas", name: "battery" },
            { prefix: "fas", name: "battery-5" },
            { prefix: "fas", name: "battery-full" },
            { prefix: "fas", name: "skull-crossbones" },
            { prefix: "fas", name: "code-compare" },
            { prefix: "fas", name: "list-dots" },
            { prefix: "fas", name: "list-ul" },
            { prefix: "fas", name: "school-lock" },
            { prefix: "fas", name: "tower-cell" },
            { prefix: "fas", name: "long-arrow-alt-down" },
            { prefix: "fas", name: "down-long" },
            { prefix: "fas", name: "ranking-star" },
            { prefix: "fas", name: "chess-king" },
            { prefix: "fas", name: "person-harassing" },
            { prefix: "fas", name: "brazilian-real-sign" },
            { prefix: "fas", name: "landmark-alt" },
            { prefix: "fas", name: "landmark-dome" },
            { prefix: "fas", name: "arrow-up" },
            { prefix: "fas", name: "television" },
            { prefix: "fas", name: "tv-alt" },
            { prefix: "fas", name: "tv" },
            { prefix: "fas", name: "shrimp" },
            { prefix: "fas", name: "tasks" },
            { prefix: "fas", name: "list-check" },
            { prefix: "fas", name: "jug-detergent" },
            { prefix: "fas", name: "user-circle" },
            { prefix: "fas", name: "circle-user" },
            { prefix: "fas", name: "user-shield" },
            { prefix: "fas", name: "wind" },
            { prefix: "fas", name: "car-crash" },
            { prefix: "fas", name: "car-burst" },
            { prefix: "fas", name: "y" },
            { prefix: "fas", name: "snowboarding" },
            { prefix: "fas", name: "person-snowboarding" },
            { prefix: "fas", name: "shipping-fast" },
            { prefix: "fas", name: "truck-fast" }
        ]
    }
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
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
