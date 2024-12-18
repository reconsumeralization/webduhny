import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "@webiny/react-router";
import { Link } from "./Link";
import { Text } from "~/Text";

const meta: Meta<typeof Link> = {
    title: "Components/Link",
    component: Link,
    tags: ["autodocs"],
    decorators: [
        (Story: React.ComponentType) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        )
    ],
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg", "xl"] },
        variant: { control: "select", options: ["primary", "secondary"] }
    }
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
    args: {
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkXl: Story = {
    args: {
        size: "xl",
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkLg: Story = {
    args: {
        size: "lg",
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkMd: Story = {
    args: {
        size: "md",
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkSm: Story = {
    args: {
        size: "sm",
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const InheritedSize: Story = {
    name: "Link with inherited size",
    render: linkProps => {
        return (
            <Text
                text={
                    <>
                        <Text
                            size="lg"
                            text={
                                <>
                                    Size of this text is set to large, so,&nbsp;
                                    <Link {...linkProps}>this link&apos;s</Link> size is also
                                    automatically set to large.
                                </>
                            }
                        />
                    </>
                }
            />
        );
    },
    args: {
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const WithUnderline: Story = {
    args: {
        underline: true,
        to: "#",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const PrimaryNegative: Story = {
    decorators: [
        Story => (
            <div className="bg-[#25292e] p-[300px] rounded-[5px] text-neutral-dimmed">
                <Story />
            </div>
        )
    ],
    render: args => {
        return (
            <Text
                text={
                    <>
                        Lorem <Link {...args}>ipsum dolor sit amet</Link>, consectetur adipiscing
                        elit. Fusce tempus tortor eu sapien interdum rhoncus.
                    </>
                }
            />
        );
    },
    args: {
        ...Default.args,
        variant: "primary-negative"
    }
};

export const SecondaryNegative: Story = {
    decorators: [
        Story => (
            <div className="bg-[#25292e] p-[300px] rounded-[5px] text-neutral-dimmed">
                <Story />
            </div>
        )
    ],
    render: args => {
        return (
            <Text
                text={
                    <>
                        Lorem <Link {...args}>ipsum dolor sit amet</Link>, consectetur adipiscing
                        elit. Fusce tempus tortor eu sapien interdum rhoncus.
                    </>
                }
            />
        );
    },
    args: {
        ...Default.args,
        variant: "secondary-negative"
    }
};
