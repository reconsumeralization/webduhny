import React from "react";
import { ReactComponent as AddIcon } from "@material-design-icons/svg/round/add.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
    title: "Components/Tag",
    component: Tag,
    parameters: {
        layout: "padded"
    }
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    args: {
        content: "Label"
    }
};

export const WithOnClickCallback: Story = {
    args: {
        ...Default.args,
        onClick: evt => {
            console.log("onClick", evt);
        }
    }
};

export const WithOnDismissCallback: Story = {
    args: {
        ...Default.args,
        onDismiss: evt => {
            console.log("onDismiss", evt);
        }
    }
};

export const WithCustomDismissIconElement: Story = {
    args: {
        ...WithOnDismissCallback.args,
        dismissIconElement: <AddIcon />,
        dismissIconLabel: "Custom dismiss label"
    }
};

export const NeutralBase: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "neutral-base"
    }
};

export const NeutralBaseDisabled: Story = {
    args: {
        ...NeutralBase.args,
        disabled: true
    }
};

export const NeutralLight: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "neutral-light"
    }
};

export const NeutralLightDisabled: Story = {
    args: {
        ...NeutralLight.args,
        disabled: true
    }
};

export const NeutralStrong: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "neutral-strong"
    }
};

export const NeutralStrongDisabled: Story = {
    args: {
        ...NeutralStrong.args,
        disabled: true
    }
};

export const NeutralDark: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "neutral-dark"
    }
};

export const NeutralDarkDisabled: Story = {
    args: {
        ...NeutralDark.args,
        disabled: true
    }
};

export const Accent: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "accent"
    }
};

export const AccentDisabled: Story = {
    args: {
        ...Accent.args,
        disabled: true
    }
};

export const Success: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "success"
    }
};

export const SuccessDisabled: Story = {
    args: {
        ...Success.args,
        disabled: true
    }
};

export const Warning: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "warning"
    }
};

export const WarningDisabled: Story = {
    args: {
        ...Warning.args,
        disabled: true
    }
};

export const Destructive: Story = {
    args: {
        ...WithOnDismissCallback.args,
        variant: "destructive"
    }
};

export const DestructiveDisabled: Story = {
    args: {
        ...Destructive.args,
        disabled: true
    }
};

export const FullExample: Story = {
    args: WithOnDismissCallback.args,
    render: args => {
        return (
            <div className={"wby-flex wby-gap-sm"}>
                <Tag {...args} content={"Neutral base"} variant={"neutral-base"} />
                <Tag {...args} content={"Neutral light"} variant={"neutral-light"} />
                <Tag {...args} content={"Neutral strong"} variant={"neutral-strong"} />
                <Tag {...args} content={"Neutral dark"} variant={"neutral-dark"} />
                <Tag {...args} content={"Success"} variant={"success"} />
                <Tag {...args} content={"Warning"} variant={"warning"} />
                <Tag {...args} content={"Destructive"} variant={"destructive"} />
                <Tag {...args} content={"Accent"} variant={"accent"} />
            </div>
        );
    }
};
