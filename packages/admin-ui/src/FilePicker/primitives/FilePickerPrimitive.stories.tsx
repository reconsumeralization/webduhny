import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilePickerPrimitive, type FileValue } from "./FilePickerPrimitive";

const file: FileValue = {
    name: "selected-background.jpg",
    mimeType: "image/jpeg",
    size: 1715938,
    src: "https://picsum.photos/1000/750"
};

const meta: Meta<typeof FilePickerPrimitive> = {
    title: "Components/Form Primitives/FilePicker",
    component: FilePickerPrimitive,
    tags: ["autodocs"],
    argTypes: {
        onSelectItem: { action: "onSelectItem" },
        onRemoveItem: { action: "onRemoveItem" },
        disabled: {
            control: "boolean",
            defaultValue: false
        }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [selectedFile, setSelectedFile] = useState<FileValue | null | undefined>(args.value);
        return (
            <FilePickerPrimitive
                {...args}
                value={selectedFile}
                onSelectItem={() => setSelectedFile(file)}
                onRemoveItem={() => setSelectedFile(null)}
            />
        );
    }
};

export default meta;
type Story = StoryObj<typeof FilePickerPrimitive>;

export const Default: Story = {
    args: {
        label: "Upload background image"
    }
};

/**
 * Area Type
 */

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

/**
 * Area Type With Image Preview
 */

export const AreaWithImagePreview: Story = {
    args: {
        ...AreaType.args,
        value: file,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.Image onRemoveItem={() => console.log(props)} {...props} />
        )
    }
};

export const AreaWithImagePreviewLight: Story = {
    args: {
        ...AreaWithImagePreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.Image variant={"light"} {...props} />
        )
    }
};

export const AreaWithImagePreviewBase: Story = {
    args: {
        ...AreaWithImagePreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.Image variant={"base"} {...props} />
        )
    }
};

export const AreaWithImagePreviewTransparent: Story = {
    args: {
        ...AreaWithImagePreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.Image variant={"transparent"} {...props} />
        )
    }
};

/**
 * Area Type With RichItem Preview
 */

export const AreaWithRichItemPreview: Story = {
    args: {
        ...AreaType.args,
        value: file,
        renderFilePreview: props => <FilePickerPrimitive.Preview.RichItem {...props} />
    }
};

export const AreaWithRichItemPreviewLight: Story = {
    args: {
        ...AreaWithRichItemPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.RichItem variant={"light"} {...props} />
        )
    }
};

export const AreaWithRichItemPreviewBase: Story = {
    args: {
        ...AreaWithRichItemPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.RichItem variant={"base"} {...props} />
        )
    }
};

export const AreaWithRichItemPreviewTransparent: Story = {
    args: {
        ...AreaWithRichItemPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.RichItem variant={"transparent"} {...props} />
        )
    }
};

/**
 * Area Type With Text Only Preview
 */
export const AreaWithTextOnlyPreview: Story = {
    args: {
        ...AreaType.args,
        value: file,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.TextOnly
                onRemoveItem={() => console.log(props)}
                {...props}
            />
        )
    }
};

export const AreaWithTextOnlyPreviewLight: Story = {
    args: {
        ...AreaWithTextOnlyPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.TextOnly variant={"light"} {...props} />
        )
    }
};

export const AreaWithTextOnlyPreviewBase: Story = {
    args: {
        ...AreaWithTextOnlyPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.TextOnly variant={"base"} {...props} />
        )
    }
};

export const AreaWithTextOnlyPreviewTransparent: Story = {
    args: {
        ...AreaWithTextOnlyPreview.args,
        renderFilePreview: props => (
            <FilePickerPrimitive.Preview.TextOnly variant={"transparent"} {...props} />
        )
    }
};

/**
 * Compact Type
 */
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
