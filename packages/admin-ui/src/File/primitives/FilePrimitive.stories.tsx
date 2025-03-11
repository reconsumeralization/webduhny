import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilePrimitive } from "./FilePrimitive";

const meta: Meta<typeof FilePrimitive> = {
    title: "Components/Form Primitives/File",
    component: FilePrimitive,
    tags: ["autodocs"],
    argTypes: {
        onSelectImage: { action: "onSelectImage" },
        onRemoveImage: { action: "onRemoveImage" },
        onEditImage: { action: "onEditImage" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [selectedImage, setSelectedImage] = useState();
        return (
            <FilePrimitive
                {...args}
                value={selectedImage}
                onSelectImage={() =>
                    setSelectedImage({
                        src: "https://picsum.photos/1000/750"
                    })
                }
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof FilePrimitive>;

export const Default: Story = {};

export const CompactType: Story = {
    args: {
        type: "compact"
    }
};

export const AreaType: Story = {
    args: {
        type: "area"
    }
};

export const PrimaryVariant: Story = {
    args: {
        variant: "primary"
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
        variant: "secondary"
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
        variant: "ghost"
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
