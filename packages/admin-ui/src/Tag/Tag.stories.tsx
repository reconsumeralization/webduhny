import React from "react";
import { ReactComponent as AddIcon } from "@material-design-icons/svg/round/add.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
    title: "Components/Tag",
    component: Tag,
    tags: ["autodocs"],
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

export const IsDismissible: Story = {
    args: {
        ...Default.args,
        isDismissible: true,
        onDismiss: evt => {
            console.log("onDismiss", evt);
        }
    }
};

export const WithCustomDismissIconElement: Story = {
    args: {
        ...IsDismissible.args,
        dismissIconElement: <AddIcon />,
        dismissIconLabel: "Custom dismiss label"
    }
};

export const NeutralBase: Story = {
    args: {
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
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
        ...IsDismissible.args,
        variant: "destructive"
    }
};

export const DestructiveDisabled: Story = {
    args: {
        ...Destructive.args,
        disabled: true
    }
};
