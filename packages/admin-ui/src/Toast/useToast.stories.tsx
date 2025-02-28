import React from "react";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { useToast, type UseToastParams } from "./useToast";
import { Button } from "~/Button";
import { Icon } from "~/Icon";

const ToastComponent = (props: UseToastParams) => {
    return <Button text={"Display Toast"} onClick={() => useToast(props)} />;
};

const meta: Meta<UseToastParams> = {
    title: "Hooks/useToast",
    component: ToastComponent,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen"
    },
    argTypes: {
        variant: { control: "select", options: ["default", "subtle"] }
    },
    decorators: [
        Story => (
            <div className="wby-w-full wby-h-64 wby-flex wby-justify-center wby-items-center">
                <Story />
                <Toast.Provider />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<UseToastParams>;

export const Default: Story = {
    args: {
        title: "New entry created"
    }
};

export const SubtleVariant: Story = {
    args: {
        ...Default.args,
        variant: "subtle"
    }
};

export const WithTitleComponent: Story = {
    args: {
        title: <Toast.Title text={"New entry created"} />
    }
};

export const WithDescription: Story = {
    args: {
        ...Default.args,
        description: 'Entry "Article One" has been successfully created'
    }
};

export const WithDescriptionComponent: Story = {
    args: {
        ...Default.args,
        description: (
            <Toast.Description text={'Entry "Article One" has been successfully created'} />
        )
    }
};

export const WithActions: Story = {
    args: {
        ...Default.args,
        actions: (
            <Toast.Actions>
                <Button
                    key={"action-1"}
                    text={"Do the action"}
                    onClick={() => console.log("doTheAction")}
                />
                <Button
                    key={"action-2"}
                    text={"Dismiss"}
                    onClick={() => console.log("dismiss")}
                    variant={"secondary"}
                />
            </Toast.Actions>
        )
    }
};

export const WithDescriptionAndActions: Story = {
    args: {
        ...Default.args,
        description: (
            <Toast.Description text={'Entry "Article One" has been successfully created'} />
        ),
        actions: (
            <Toast.Actions>
                <Button
                    key={"action-1"}
                    text={"Do the action"}
                    onClick={() => console.log("doTheAction")}
                />
                <Button
                    key={"action-2"}
                    text={"Dismiss"}
                    onClick={() => console.log("dismiss")}
                    variant={"secondary"}
                />
            </Toast.Actions>
        )
    }
};

export const WithCustomIcon: Story = {
    args: {
        ...Default.args,
        icon: <Icon icon={<SettingsIcon />} label={"Settings"} />
    }
};

export const WithInfiniteDuration: Story = {
    args: {
        ...Default.args,
        duration: Infinity
    }
};

export const NotDismissible: Story = {
    args: {
        ...Default.args,
        dismissible: false
    }
};

export const withCustomPosition: Story = {
    args: {
        ...Default.args,
        position: "bottom-right"
    }
};
