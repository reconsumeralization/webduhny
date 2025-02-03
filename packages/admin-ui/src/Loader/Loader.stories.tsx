import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
    title: "Components/Loader",
    component: Loader,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

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

export const Accent: Story = {
    args: {
        variant: "accent"
    }
};

export const Subtle: Story = {
    args: {
        variant: "subtle"
    }
};

export const Negative: Story = {
    args: {
        variant: "negative"
    },
    decorators: [
        Story => (
            <div className="wby-bg-primary wby-p-md wby-rounded-md">
                <Story />
            </div>
        )
    ]
};

export const WithControlledValue: Story = {
    args: {
        value: 0,
        indeterminate: false
    },
    render: args => {
        const [value, setValue] = useState(args.value);

        useEffect(() => {
            const interval = setInterval(() => {
                setValue((prevValue = 0) => {
                    if (prevValue === 100) {
                        return prevValue;
                    }
                    return prevValue + 5;
                });
            }, 50);

            return () => clearInterval(interval);
        }, []);

        return <Loader {...args} value={value} text={`Loading ${value}%`} />;
    }
};

export const WithText: Story = {
    args: {
        text: "Loading..."
    }
};
