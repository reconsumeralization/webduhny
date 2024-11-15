import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./Radio";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    tags: ["autodocs"],
    argTypes: {
        onValueChange: { action: "onValueChange" }
    },
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div className="w-1/3 h-64 mx-auto flex justify-center items-center">
                <Story />
            </div>
        )
    ],
    render: args => {
        const [value, setValue] = useState(args.value);
        return <RadioGroup {...args} value={value} onValueChange={setValue} />;
    }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    args: {
        items: [
            {
                id: "value-1",
                value: "value-1",
                label: "Value 1"
            },
            {
                id: "value-2",
                value: "value-2",
                label: "Value 2"
            }
        ]
    }
};

export const Empty: Story = {};

export const WithDefaultOption: Story = {
    args: {
        ...Default.args,
        value: "value-2"
    }
};

export const WithDisabledOption: Story = {
    args: {
        ...Default.args,
        items: [
            {
                id: "value-1",
                value: "value-1",
                label: "Value 1"
            },
            {
                id: "value-2",
                value: "value-2",
                label: "Value 2",
                disabled: true
            }
        ]
    }
};

export const WithDefaultDisabledOption: Story = {
    args: {
        ...Default.args,
        value: "value-2",
        items: [
            {
                id: "value-1",
                value: "value-1",
                label: "Value 1"
            },
            {
                id: "value-2",
                value: "value-2",
                label: "Value 2",
                disabled: true
            }
        ]
    }
};

export const WithExternalValueControl: Story = {
    args: {
        ...Default.args,
        value: "value-2",
        items: [
            {
                id: "value-1",
                value: "value-1",
                label: "Value 1"
            },
            {
                id: "value-2",
                value: "value-2",
                label: "Value 2"
            },
            {
                id: "value-3",
                value: "value-3",
                label: "Value 3"
            }
        ]
    },
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <div className={"w-full"}>
                <div>
                    <RadioGroup {...args} value={value} onValueChange={setValue} />
                </div>
                <div className={"mt-4 text-center"}>
                    <button onClick={() => setValue(args.value)}>{"Reset"}</button>
                </div>
                <div className={"mt-4 text-center"}>
                    Current selected value: <pre>{value}</pre>
                </div>
            </div>
        );
    }
};
