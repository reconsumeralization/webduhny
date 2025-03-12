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
        const [selectedImage, setSelectedImage] = useState<Record<string, any> | null>(null);
        return (
            <FilePrimitive
                {...args}
                value={selectedImage}
                onSelectImage={() =>
                    setSelectedImage({
                        src: "https://picsum.photos/1000/750"
                    })
                }
                onRemoveImage={() => setSelectedImage(null)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof FilePrimitive>;

export const Default: Story = {
    args: {
        label: "Upload background image"
    }
};

export const CompactType: Story = {
    args: {
        ...Default.args,
        type: "compact"
    }
};

export const CompactPrimaryVariant: Story = {
    args: {
        ...CompactType.args,
        variant: "primary"
    }
};

export const CompactPrimaryVariantDisabled: Story = {
    args: {
        ...CompactPrimaryVariant.args,
        disabled: true
    }
};

export const CompactPrimaryVariantInvalid: Story = {
    args: {
        ...CompactPrimaryVariant.args,
        invalid: true
    }
};

export const CompactSecondaryVariant: Story = {
    args: {
        ...CompactType.args,
        variant: "secondary"
    }
};

export const CompactSecondaryVariantDisabled: Story = {
    args: {
        ...CompactSecondaryVariant.args,
        disabled: true
    }
};

export const CompactSecondaryVariantInvalid: Story = {
    args: {
        ...CompactSecondaryVariant.args,
        invalid: true
    }
};

export const CompactGhostVariant: Story = {
    args: {
        ...CompactType.args,
        variant: "ghost"
    }
};

export const CompactGhostVariantDisabled: Story = {
    args: {
        ...CompactGhostVariant.args,
        disabled: true
    }
};

export const CompactGhostVariantInvalid: Story = {
    args: {
        ...CompactGhostVariant.args,
        invalid: true
    }
};

export const AreaType: Story = {
    args: {
        ...Default.args,
        type: "area"
    }
};

export const AreaPrimaryVariant: Story = {
    args: {
        ...AreaType.args,
        variant: "primary"
    }
};

export const AreaPrimaryVariantDisabled: Story = {
    args: {
        ...AreaPrimaryVariant.args,
        disabled: true
    }
};

export const AreaPrimaryVariantInvalid: Story = {
    args: {
        ...AreaPrimaryVariant.args,
        invalid: true
    }
};

export const AreaSecondaryVariant: Story = {
    args: {
        ...AreaType.args,
        variant: "secondary"
    }
};

export const AreaSecondaryVariantDisabled: Story = {
    args: {
        ...AreaSecondaryVariant.args,
        disabled: true
    }
};

export const AreaSecondaryVariantInvalid: Story = {
    args: {
        ...AreaSecondaryVariant.args,
        invalid: true
    }
};

export const AreaGhostVariant: Story = {
    args: {
        ...AreaType.args,
        variant: "ghost"
    }
};

export const AreaGhostVariantDisabled: Story = {
    args: {
        ...AreaGhostVariant.args,
        disabled: true
    }
};

export const AreaGhostVariantInvalid: Story = {
    args: {
        ...AreaGhostVariant.args,
        invalid: true
    }
};
