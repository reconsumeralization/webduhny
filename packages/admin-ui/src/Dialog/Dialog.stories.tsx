import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "~/Button";
import { DropdownMenu } from "~/DropdownMenu";
import { ReactComponent as DoorbellIcon } from "@material-design-icons/svg/outlined/ring_volume.svg";
import { Tabs } from "~/Tabs";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        title: "Dialog Title",
        description: "A short dialog description.",
        info: (
            <>
                Learn more about this <a href={"#"}>here</a>.
            </>
        ),
        children: (
            <>
                The amazing, splendid, and most useful umbrella, resistant to rain and friendly to
                winds, is something that deserves all admiration. Crafted with perfect textures, it
                bravely withstands storms and gently shades the rays of the sun. A remarkable
                innovation, with an ergonomically designed grip most suited to the hand, it remains
                stable even in the fiercest weather.
            </>
        ),
        onOpenChange: opened => {
            console.log(`Dialog is ${opened ? "opened" : "closed"}.`);
        },
        actions: (
            <>
                <Dialog.CancelButton />
                <Dialog.ConfirmButton />
            </>
        )
    },
    argTypes: {}
};

export const ControlledVisibility: Story = {
    render: props => {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <Button variant="primary" text={"Open"} onClick={() => setOpen(true)} />
                <Dialog
                    {...props}
                    open={open}
                    onOpenChange={open => {
                        if (!open) {
                            setOpen(false);
                        }
                    }}
                />
            </>
        );
    },
    args: { ...Default.args, trigger: null }
};

export const WithDropdownMenu: Story = {
    render: props => {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <DropdownMenu trigger={<Button variant="primary" text={"Open"} />}>
                    <DropdownMenu.Item content={"Open Dialog"} onClick={() => setOpen(true)} />
                </DropdownMenu>

                <Dialog {...props} open={open} onOpenChange={() => setOpen(false)} />
            </>
        );
    },
    args: { ...Default.args, trigger: null }
};

export const WithoutCloseButton: Story = {
    args: { ...Default.args, showCloseButton: false }
};

export const AlertDialog: Story = {
    args: {
        ...Default.args,
        info: null,
        showCloseButton: false,
        title: "Confirm Action",
        description: "Are you sure you want to delete this item?",
        children: (
            <>
                <p>This action cannot be undone.</p>
                <p>Deleted items cannot be recovered.</p>
            </>
        )
    }
};

export const DropdownMenuInDialog: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <DropdownMenu trigger={<Button variant="primary" text={"Open"} />}>
                    <DropdownMenu.Item content={"Billing"} />
                    <DropdownMenu.Item content={"Settings"} />
                    <DropdownMenu.Item content={"Keyboard shortcuts"} />
                </DropdownMenu>
            </>
        )
    }
};

export const WithIcon: Story = {
    args: {
        ...Default.args,
        icon: <Dialog.Icon icon={<DoorbellIcon />} label={"Title icon"} />
    }
};

export const PreventOutsideDismiss: Story = {
    args: {
        ...Default.args,
        dismissible: false
    }
};

export const WithTabs: Story = {
    args: {
        ...Default.args,
        bodyPadding: false,
        children: (
            <>
                <Tabs
                    spacing={"lg"}
                    tabs={[
                        <Tabs.Tab
                            key={"account"}
                            value={"account"}
                            trigger={"Account"}
                            content={"Make changes to your account here."}
                        />,
                        <Tabs.Tab
                            key={"company"}
                            value={"company"}
                            trigger={"Company"}
                            content={"Make changes to your company info here."}
                        />,
                        <Tabs.Tab
                            key={"security"}
                            value={"security"}
                            trigger={"Security"}
                            content={"Make changes to your security settings here."}
                        />,
                        <Tabs.Tab
                            key={"development"}
                            value={"development"}
                            trigger={"Development"}
                            content={"Make changes to your development settings here."}
                        />
                    ]}
                />
            </>
        )
    }
};
