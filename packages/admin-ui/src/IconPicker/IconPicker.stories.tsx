import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconDto, IconPicker } from "~/IconPicker";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { IconPrefix } from "@fortawesome/fontawesome-common-types";
import { fas } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconPicker> = {
    title: "Components/Form/IconPicker",
    component: IconPicker,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" }
    },
    parameters: {
        layout: "padded"
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return <IconPicker {...args} value={value} onChange={setValue} />;
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
type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {
    args: {
        icons: getIcons()
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
