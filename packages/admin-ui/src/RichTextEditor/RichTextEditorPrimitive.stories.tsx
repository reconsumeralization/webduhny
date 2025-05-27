import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditorPrimitive } from "./RichTextEditorPrimitive";

const meta: Meta<typeof RichTextEditorPrimitive> = {
    title: "Components/Form Primitives/RichTextEditor",
    component: RichTextEditorPrimitive,
    argTypes: {
        onChange: { action: "onChange" },
        onReady: { action: "onReady" }
    },
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof RichTextEditorPrimitive>;

export const Default: Story = {};

export const MediumSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "md"
    }
};

export const LargeSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "lg"
    }
};

export const ExtraLargeSize: Story = {
    args: {
        placeholder: "Custom placeholder",
        size: "xl"
    }
};

export const PrimaryVariant: Story = {
    args: {
        variant: "primary",
        placeholder: "Custom placeholder"
    }
};

export const PrimaryVariantDisabled: Story = {
    args: {
        ...PrimaryVariant.args,
        disabled: true
    }
};

export const PrimaryVariantInvalid: Story = {
    args: {
        ...PrimaryVariant.args,
        invalid: true
    }
};

export const SecondaryVariant: Story = {
    args: {
        variant: "secondary",
        placeholder: "Custom placeholder"
    }
};

export const SecondaryVariantDisabled: Story = {
    args: {
        ...SecondaryVariant.args,
        disabled: true
    }
};

export const SecondaryVariantInvalid: Story = {
    args: {
        ...SecondaryVariant.args,
        invalid: true
    }
};

export const GhostVariant: Story = {
    args: {
        variant: "ghost",
        placeholder: "Custom placeholder"
    }
};

export const GhostVariantDisabled: Story = {
    args: {
        ...GhostVariant.args,
        disabled: true
    }
};

export const GhostVariantInvalid: Story = {
    args: {
        ...GhostVariant.args,
        invalid: true
    }
};

export const WithCustomValue: Story = {
    args: {
        ...Default.args,
        value: [
            {
                type: "paragraph",
                data: { text: "Custom value", id: "any-custom-id", type: "paragraph" }
            }
        ]
    }
};
