import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";
import { Label } from "~/Label";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/Radio",
    component: RadioGroup,
    tags: ["autodocs"],
    argTypes: {},
    render: args => {
        const [value, setValue] = useState(args.value);
        return (
            <RadioGroup defaultValue="option-one" onValueChange={setValue} value={value}>
                <div className="flex items-center space-x-2">
                    <Radio value="option-one" id="option-one" />
                    <Label htmlFor="option-one" text={"Option One"} />
                </div>
                <div className="flex items-center space-x-2">
                    <Radio value="option-two" id="option-two" />
                    <Label htmlFor="option-two" text={"Option Two"} />
                </div>
                <div className="flex items-center space-x-2">
                    <Radio value="option-three" id="option-three" disabled />
                    <Label htmlFor="option-three" text={"Option Three"} />
                </div>
            </RadioGroup>
        );
    }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Empty: Story = {};

export const Default: Story = {};

export const WithDefaultValue: Story = {
    args: {
        value: "option-two"
    }
};
