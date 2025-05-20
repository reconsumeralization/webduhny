import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as XIcon } from "@webiny/icons/close.svg";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
    title: "Components/Icon",
    component: Icon
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        icon: <XIcon />,
        label: "This is an icon",
        size: "md",
        color: "accent"
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg"]
        },
        color: {
            control: "select",
            options: ["accent", "neutral", "neutral-strong", "neutral-light", "inherit"]
        }
    }
};

export const ColorAccent: Story = {
    args: {
        ...Default.args,
        color: "accent"
    }
};

export const ColorNeutral: Story = {
    decorators: [
        Story => (
            <div className="wby-bg-[#25292e] wby-p-[300px] wby-rounded-[5px]">
                <Story />
            </div>
        )
    ],
    args: {
        ...Default.args,
        color: "neutral"
    }
};

export const ColorNeutralStrong: Story = {
    args: {
        ...Default.args,
        color: "neutral-strong"
    }
};

export const ColorNeutralXStrong: Story = {
    args: {
        ...Default.args,
        color: "neutral-strong"
    }
};

export const ColorInherit: Story = {
    decorators: [
        Story => (
            <div className="wby-fill-success">
                <Story />
            </div>
        )
    ],
    args: {
        ...Default.args,
        color: "inherit"
    }
};

export const SizeXs: Story = {
    args: {
        ...Default.args,
        size: "xs"
    }
};

export const SizeSm: Story = {
    args: {
        ...Default.args,
        size: "sm"
    }
};

export const SizeMd: Story = {
    args: {
        ...Default.args,
        size: "md"
    }
};

export const SizeLg: Story = {
    args: {
        ...Default.args,
        size: "lg"
    }
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
};

export const Documentation: Story = {
    args: {
        icon: <XIcon />,
        label: "Close icon",
        size: "md",
        color: "accent",
        disabled: false,
        className: ""
    },
    argTypes: {
        icon: {
            description:
                "The SVG icon component to be rendered. Please refer to the example code for details.",
            control: "none"
        },
        label: {
            description: "Accessible label for the icon (for screen readers)",
            control: "text"
        },
        size: {
            description: "The size of the icon",
            control: "select",
            options: ["xs", "sm", "md", "lg"]
        },
        color: {
            description: "The color of the icon",
            control: "select",
            options: ["inherit", "accent", "neutral", "neutral-light", "neutral-strong"]
        },
        disabled: {
            description: "Whether the icon should appear disabled",
            control: "boolean"
        },
        className: {
            description:
                "Additional CSS classes to apply to the icon. You can pass multiple classes, separated by commas or spaces.",
            control: "text"
        }
    }
};
