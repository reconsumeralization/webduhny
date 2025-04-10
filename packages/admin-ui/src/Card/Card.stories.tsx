import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as MoreVertical } from "@webiny/icons/more_vert.svg";
import { Card } from "./Card";
import { Button, IconButton } from "~/Button";
import { Icon } from "~/Icon";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    decorators: [
        Story => (
            <div className="wby-bg-[#f4f4f4] wby-h-[500px] wby-w-[700px] wby-rounded-[5px] wby-px-[50px] wby-content-center">
                <div className={"wby-m-auto wby-w-[300px]"}>
                    <Story />
                </div>
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        title: "Card title goes here",
        description: "Card description goes here",
        children: <>This is card content. Anything can go in here.</>,
        actions: (
            <>
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
            </>
        ),
        padding: "standard",
        elevation: "sm",
        borderRadius: "md"
    },
    argTypes: {
        padding: {
            control: "select",
            options: ["none", "standard", "comfortable"]
        },
        elevation: {
            control: "select",
            options: ["none", "xs", "sm", "md", "lg", "xl"]
        },
        borderRadius: {
            control: "select",
            options: ["none", "sm", "md", "lg"]
        }
    }
};

export const NoTitleDescriptionActionsHeaderAndFooter: Story = {
    name: "Only Body (Without Body, Title, Actions)",
    args: {
        children: <>This is card content. Anything can go in here.</>
    }
};

export const WithMorePadding: Story = {
    args: {
        ...Default.args,
        actions: null,
        padding: "comfortable"
    }
};

export const WithMoreElevation: Story = {
    args: {
        ...Default.args,
        actions: null,
        elevation: "md"
    }
};

export const NoElevation: Story = {
    args: {
        ...Default.args,
        actions: null,
        elevation: "none"
    }
};

export const NoBorderRadius: Story = {
    args: {
        ...Default.args,
        actions: null,
        borderRadius: "none"
    }
};

export const WithOptions: Story = {
    args: {
        ...Default.args,
        actions: null,
        options: (
            <IconButton
                variant={"ghost"}
                icon={<Icon icon={<MoreVertical />} label={"More options"} />}
                size={"sm"}
                iconSize={"lg"}
                onClick={() => alert("Custom action button clicked.")}
            />
        )
    }
};

export const WithActions: Story = {
    args: Default.args
};
