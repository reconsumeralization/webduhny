import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";
import React from "react";
import { Heading } from "~/Heading";
import { Text } from "~/Text";

const meta: Meta<typeof Separator> = {
    title: "Components/Separator",
    component: Separator,
    argTypes: {},
    decorators: [
        Story => (
            <div className="wby-w-[700px]">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Documentation: Story = {
    args: {
        variant: "subtle",
        margin: "lg",
        orientation: "horizontal",
        decorative: true
    },
    argTypes: {
        margin: {
            description: "The margin around the separator.",
            control: "select",
            options: ["none", "xs", "sm", "md", "lg", "xl"]
        },
        variant: {
            description: "The visual style variant of the separator.",
            control: "select",
            options: ["strong", "subtle", "dimmed", "white", "transparent"]
        },
        orientation: {
            description: "The orientation of the separator.",
            control: "select",
            options: ["horizontal", "vertical"]
        },
        decorative: {
            description:
                "Whether the separator is purely decorative and should be hidden from screen readers.",
            control: "boolean"
        }
    },
    render: props => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator
                    margin={props.margin}
                    variant={props.variant}
                    orientation={props.orientation}
                    decorative={props.decorative}
                />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                </div>
            </div>
        );
    }
};

export const Default: Story = {
    args: {
        variant: "subtle",
        margin: "lg"
    },
    render: props => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator margin={props.margin} variant={props.variant} />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                </div>
            </div>
        );
    },
    argTypes: {
        margin: {
            control: "select",
            options: ["xs", "sm", "md", "lg", "xl"]
        },
        variant: {
            control: "select",
            options: ["strong", "subtle", "dimmed", "white", "transparent"]
        }
    }
};

export const VerticalAndHorizontal: Story = {
    render: () => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator margin={"lg"} />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                    <Separator orientation="vertical" margin={"lg"} />
                    <Text>{"This is text 2."}</Text>
                    <Separator orientation="vertical" margin={"lg"} />
                    <Text>{"This is text 3."}</Text>
                </div>
            </div>
        );
    }
};

export const HorizontalOrientation: Story = {
    args: {
        orientation: "horizontal"
    },
    render: () => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator margin={"lg"} />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                </div>
            </div>
        );
    }
};

export const VerticalOrientation: Story = {
    args: {
        orientation: "vertical"
    },
    render: () => {
        return (
            <div className="wby-flex wby-justify-center wby-h-6 wby-text-sm">
                <Text>{"This is text 1."}</Text>
                <Separator orientation="vertical" margin={"lg"} />
                <Text>{"This is text 2."}</Text>
                <Separator orientation="vertical" margin={"lg"} />
                <Text>{"This is text 3."}</Text>
            </div>
        );
    }
};

export const LessMargin: Story = {
    render: () => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator margin={"md"} />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                    <Separator orientation="vertical" margin={"md"} />
                    <Text>{"This is text 2."}</Text>
                    <Separator orientation="vertical" margin={"md"} />
                    <Text>{"This is text 3."}</Text>
                </div>
            </div>
        );
    }
};

export const MoreMargin: Story = {
    render: () => {
        return (
            <div>
                <div className="wby-space-y-1">
                    <Heading level={6}>{"This is a heading."}</Heading>
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {"This is a short description here"}
                    </Text>
                </div>
                <Separator margin={"xl"} />
                <div className="wby-flex wby-items-center wby-h-6 wby-text-sm">
                    <Text>{"This is text 1."}</Text>
                    <Separator orientation="vertical" margin={"xl"} />
                    <Text>{"This is text 2."}</Text>
                    <Separator orientation="vertical" margin={"xl"} />
                    <Text>{"This is text 3."}</Text>
                </div>
            </div>
        );
    }
};
