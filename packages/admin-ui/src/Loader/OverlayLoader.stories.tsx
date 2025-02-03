import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OverlayLoader } from "./OverlayLoader";

const meta: Meta<typeof OverlayLoader> = {
    title: "Components/OverlayLoader",
    component: OverlayLoader,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    },
    decorators: [
        Story => (
            <div className={"wby-relative"}>
                <Story />
                <div
                    className={
                        "wby-bg-[repeating-linear-gradient(to_bottom,var(--tw-gradient-stops))] wby-from-[#039BE5] wby-from-[length:0_40px] wby-to-[#90CAF9] wby-to-[length:40px_80px] wby-w-full wby-h-[300px] wby-rounded-md"
                    }
                />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof OverlayLoader>;

export const Default: Story = {};

export const CircularProgressWithText: Story = {
    name: "With text",
    args: {
        text: "Loading..."
    }
};
