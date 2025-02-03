import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconPickerPrimitive } from "./IconPickerPrimitive";
import { IconDto } from "~/IconPicker";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { fas } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconPickerPrimitive> = {
    title: "Components/Form Primitives/IconPicker",
    component: IconPickerPrimitive,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" }
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <div className={"wby-w-full"}>
                <IconPickerPrimitive {...args} value={value} onChange={setValue} />
                <div className={"wby-mt-4 wby-text-center"}>
                    Current selected value: <pre>{value}</pre>
                </div>
            </div>
        );
    },
    parameters: {
        layout: "padded"
    }
};

interface Icons {
    definitions: Record<IconPrefix, Record<IconName, string[]>>;
}

const getIcons = () => {
    const icons: IconDto[] = [];
    // @ts-expect-error
    library.add(fas);
    const definitions = (library as unknown as Icons).definitions;
    // @ts-expect-error
    Object.keys(definitions).forEach((pack: IconPrefix) => {
        const defs = definitions[pack];
        // @ts-expect-error
        Object.keys(defs).forEach((icon: IconName) => {
            icons.push({
                prefix: pack,
                name: icon
            });
        });
    });

    return icons;
};

export default meta;
type Story = StoryObj<typeof IconPickerPrimitive>;

export const Default: Story = {
    args: {
        icons: getIcons()
    }
};

export const WithDefaultValue: Story = {
    args: {
        ...Default.args,
        value: "fas/panorama"
    }
};

export const MediumSize: Story = {
    args: {
        ...Default.args,
        size: "md"
    }
};

export const LargeSize: Story = {
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const ExtraLargeSize: Story = {
    args: {
        ...Default.args,
        size: "xl"
    }
};

export const PrimaryVariant: Story = {
    args: {
        ...Default.args,
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
        ...Default.args,
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
        ...Default.args,
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
