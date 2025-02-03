import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
    title: "Components/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    argTypes: {
        type: {
            control: "select",
            options: ["text", "thumbnail", "area"]
        },
        size: {
            control: "select",
            options: ["xs", "sm", "md", "lg", "xl", "xxl", "3xl"]
        }
    }
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Text: Story = {
    args: {
        type: "text"
    }
};

export const Thumbnail: Story = {
    args: {
        type: "thumbnail"
    }
};

export const Area: Story = {
    args: {
        type: "area",
        className: "wby-w-1/2 wby-h-32"
    }
};

export const MultipleAreas: Story = {
    render: () => (
        <div className="wby-flex wby-gap-md">
            <div className="wby-flex wby-flex-col wby-gap-md">
                <Skeleton type="area" className={"wby-w-32 wby-h-32"} />
                <Skeleton type="area" className={"wby-w-32 wby-h-32"} />
            </div>
            <div>
                <Skeleton type="area" className="wby-w-32 wby-h-full" />
            </div>
        </div>
    )
};

export const ExtraSmall: Story = {
    args: {
        size: "xs"
    }
};

export const Small: Story = {
    args: {
        size: "sm"
    }
};

export const Medium: Story = {
    args: {
        size: "md"
    }
};

export const Large: Story = {
    args: {
        size: "lg"
    }
};

export const ExtraLarge: Story = {
    args: {
        size: "xl"
    }
};

export const DoubleExtraLarge: Story = {
    args: {
        size: "xxl"
    }
};

export const TripleExtraLarge: Story = {
    args: {
        size: "3xl"
    }
};
