import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
    title: "Components/Popover",
    component: Popover,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    argTypes: {
        align: {
            control: "select",
            options: ["start", "center", "end"]
        },
        side: {
            control: "select",
            options: ["top", "bottom", "left", "right"]
        }
    },
    decorators: [
        Story => (
            <div className="wby-flex wby-items-center wby-justify-center wby-w-full wby-h-48">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    args: {
        trigger: <p>Popover trigger</p>,
        content: (
            <div className={"wby-w-[260px]"}>
                <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Morbi
                lectus leo, dapibus vitae mollis dictum, vulputate eget lorem. Aliquam rutrum auctor
                tempus.
            </div>
        )
    }
};

export const AccentVariant: Story = {
    args: {
        ...Default.args,
        variant: "accent"
    }
};

export const WithArrowAccentVariant: Story = {
    args: {
        ...AccentVariant.args,
        arrow: true
    }
};

export const SubtleVariant: Story = {
    args: {
        ...Default.args,
        variant: "subtle"
    },
    decorators: [
        Story => (
            <div className="wby-flex wby-items-center wby-justify-center wby-bg-neutral-dark wby-text-neutral-light wby-w-full wby-h-48">
                <Story />
            </div>
        )
    ]
};

export const WithArrowSubtleVariant: Story = {
    args: {
        ...SubtleVariant.args,
        arrow: true
    },
    decorators: SubtleVariant.decorators
};
