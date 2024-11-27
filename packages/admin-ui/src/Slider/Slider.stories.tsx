import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
    title: "Components/Slider",
    component: Slider,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" },
        onValueCommit: { action: "onValueCommit" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Slider {...args} value={value} onValueChange={value => setValue(value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
    args: {
        label: "Label"
    }
};

export const WithNegativeMinValue: Story = {
    args: {
        label: "Label",
        min: -100,
        max: 100,
        value: 0
    }
};

export const WithSteps: Story = {
    args: {
        label: "Label",
        step: 10
    }
};

export const Disabled: Story = {
    args: {
        label: "Label",
        disabled: true,
        value: 50
    }
};

export const WithTooltip: Story = {
    args: {
        label: "Label",
        showTooltip: true
    }
};

export const WithTooltipSideTop: Story = {
    args: {
        label: "Label",
        showTooltip: true,
        tooltipSide: "top"
    }
};

export const WithSideLabelAndTooltip: Story = {
    args: {
        label: "Label",
        showTooltip: true,
        labelPosition: "side"
    }
};

export const WithCustomValueConverter: Story = {
    args: {
        label: "Label",
        transformValue: (value: number) => {
            return `${Math.round(value)}%`;
        }
    }
};

export const WithCustomValueConverterAndTooltip: Story = {
    args: {
        label: "Label",
        showTooltip: true,
        transformValue: (value: number) => {
            return `${Math.round(value)}%`;
        }
    }
};

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
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        note: "Note: Please do not use your middle name.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};

export const WithSideLabel: Story = {
    args: {
        label: "Label",
        labelPosition: "side"
    }
};

export const WithSideLabelRequired: Story = {
    args: {
        label: "Label",
        required: true,
        labelPosition: "side"
    }
};

export const WithSideLabelAndDescription: Story = {
    args: {
        label: "Label",
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        labelPosition: "side"
    }
};

export const WithSideLabelAndNote: Story = {
    args: {
        label: "Label",
        note: "Note: Please do not use your middle name.",
        labelPosition: "side"
    }
};

export const WithSideLabelAndErrors: Story = {
    args: {
        label: "Label",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        },
        labelPosition: "side"
    }
};

export const WithSideLabelFullExample: Story = {
    args: {
        label: "First and Last name",
        required: true,
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        note: "Note: Please do not use your middle name.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        },
        labelPosition: "side"
    }
};
