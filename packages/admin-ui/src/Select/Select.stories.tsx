import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as NotificationsIcon } from "@material-design-icons/svg/outlined/notifications.svg";
import { ReactComponent as CalendarIcon } from "@material-design-icons/svg/outlined/calendar_month.svg";
import { Select } from "~/Select";
import { Icon } from "~/Icon";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" },
        onOpenChange: { action: "onOpenChange" }
    },
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-1/3 h-64 mx-auto flex justify-center items-center">
                <div className="w-full">
                    <Story />
                </div>
            </div>
        )
    ],
    render: args => {
        const [value, setValue] = useState(args.value);
        return <Select {...args} value={value} onValueChange={setValue} />;
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        options: [
            "Eastern Standard Time (EST)",
            "Central Standard Time (CST)",
            "Pacific Standard Time (PST)",
            "Greenwich Mean Time (GMT)",
            "Central European Time (CET)",
            "Central Africa Time (CAT)",
            "India Standard Time (IST)",
            "China Standard Time (CST)",
            "Japan Standard Time (JST)",
            "Australian Western Standard Time (AWST)",
            "New Zealand Standard Time (NZST)",
            "Fiji Time (FJT)",
            "Argentina Time (ART)",
            "Bolivia Time (BOT)",
            "Brasilia Time (BRT)"
        ]
    }
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: "Timezone"
    }
};

export const WithStartIcon: Story = {
    args: {
        ...Default.args,
        label: "Timezone",
        placeholder: "Pick a timezone",
        startIcon: <Icon label={"Bell"} icon={<NotificationsIcon />} />
    }
};

export const WithEndIcon: Story = {
    args: {
        ...Default.args,
        label: "Timezone",
        placeholder: "Pick a timezone",
        endIcon: <Icon label={"Calendar"} icon={<CalendarIcon />} />
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description:
            "We need your timezone to make the press cards ready for your pickup at the conference."
    }
};

export const WithNotes: Story = {
    args: {
        ...Default.args,
        note: "Note: Please select only a valid timezone."
    }
};

export const WithErrors: Story = {
    args: {
        ...Default.args,
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};

export const FullExample: Story = {
    args: {
        ...Default.args,
        label: "Timezone",
        placeholder: "Pick a timezone",
        description:
            "We need your timezone to make the press cards ready for your pickup at the conference.",
        note: "Note: Please select only a valid timezone.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};
