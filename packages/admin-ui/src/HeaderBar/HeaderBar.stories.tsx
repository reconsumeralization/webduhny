import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as KeyboardArrowRightIcon } from "@webiny/icons/keyboard_arrow_down.svg";
import { HeaderBar } from "./HeaderBar";
import React from "react";
import { Button, IconButton } from "~/Button";
import { Avatar } from "~/Avatar";
import { Text } from "~/Text";

const meta: Meta<typeof HeaderBar> = {
    title: "Components/HeaderBar",
    component: HeaderBar,
    decorators: [
        Story => (
            <div className="wby-bg-[#f4f4f4] wby-h-[500px] wby-w-[850px]  wby-rounded-[5px] wby-px-[50px] wby-content-center">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof HeaderBar>;

const StartExample = () => (
    <Text size={"sm"} className={"wby-text-neutral-dimmed"}>
        {"Headless CMS / Articles / The best article ever"}
    </Text>
);

const MiddleExample = () => <>Content in the middle</>;

const EndExample = () => (
    <div className={"wby-flex wby-gap-x-sm"}>
        <Button variant={"ghost"} size={"md"} text={"Root tenant"} />
        <div
            className={
                "wby-flex wby-items-center wby-rounded-md wby-gap-xxs wby-py-xs wby-px-xs wby-bg-neutral-light"
            }
        >
            <Avatar
                size={"sm"}
                variant={"strong"}
                image={<Avatar.Image src={"https://i.pravatar.cc/300"} />}
                fallback={<Avatar.Fallback delayMs={0}>W</Avatar.Fallback>}
            />
            <IconButton
                variant={"ghost"}
                size={"xs"}
                color={"neutral-strong"}
                icon={<KeyboardArrowRightIcon />}
                onClick={() => console.log("clicked")}
            />
        </div>
    </div>
);

export const Default: Story = {
    args: {
        start: <StartExample />,
        middle: <MiddleExample />,
        end: <EndExample />
    }
};

export const StartContentOnly: Story = {
    args: {
        start: <StartExample />
    }
};

export const MiddleContentOnly: Story = {
    args: {
        middle: <MiddleExample />
    }
};

export const EndContentOnly: Story = {
    args: {
        end: <EndExample />
    }
};

export const StartEndContentOnly: Story = {
    args: {
        start: <StartExample />,
        end: <EndExample />
    }
};

export const MoreStartContent: Story = {
    args: {
        start: (
            <>
                <StartExample />
                <StartExample />
                <StartExample />
            </>
        ),
        middle: <MiddleExample />,
        end: <EndExample />
    }
};

export const Documentation: Story = {
    args: {
        start: <StartExample />,
        middle: <MiddleExample />,
        end: <EndExample />
    },
    argTypes: {
        start: {
            description: "Content displayed at the start of the header bar",
            control: "none"
        },
        middle: {
            description: "Content displayed in the middle of the header bar",
            control: "none"
        },
        end: {
            description: "Content displayed at the end of the header bar",
            control: "none"
        }
    }
};
