import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as NotificationsIcon } from "@material-design-icons/svg/outlined/notifications.svg";
import { ReactComponent as CalendarIcon } from "@material-design-icons/svg/outlined/calendar_month.svg";
import { Input } from "~/Form";
import { Icon } from "~/Icon";

const meta: Meta<typeof Input> = {
    title: "Components/Form/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        onChange: { action: "onChange" },
        type: {
            control: "select",
            options: [
                "text",
                "number",
                "email",
                "password",
                "tel",
                "url",
                "search",
                "date",
                "datetime-local",
                "month",
                "week",
                "time",
                "color",
                "file",
                "checkbox",
                "radio",
                "range",
                "hidden",
                "button",
                "submit",
                "reset",
                "image"
            ],
            defaultValue: "text"
        }
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
        return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Label"
    }
};

export const WithStartIcon: Story = {
    args: {
        label: "Label",
        placeholder: "Custom placeholder",
        startIcon: <Icon label={"Bell"} icon={<NotificationsIcon />} />
    }
};

export const WithEndIcon: Story = {
    args: {
        label: "Label",
        placeholder: "Custom placeholder",
        endIcon: <Icon label={"Calendar"} icon={<CalendarIcon />} />
    }
};

export const WithDescription: Story = {
    args: {
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference."
    }
};

export const WithNotes: Story = {
    args: {
        note: "Note: Please do not use your middle name."
    }
};

export const WithErrors: Story = {
    args: {
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};

export const FullExample: Story = {
    args: {
        label: "First and Last name",
        placeholder: "John Doe",
        description:
            "We need your first and last name to make the press cards ready for your pickup at the conference.",
        note: "Note: Please do not use your middle name.",
        validation: {
            isValid: false,
            message: "Numerical values are not allowed."
        }
    }
};
