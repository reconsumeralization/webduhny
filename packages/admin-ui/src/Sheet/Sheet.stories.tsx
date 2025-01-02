import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "./Sheet";
import { Button } from "~/Button";
import { DropdownMenu } from "~/DropdownMenu";

const meta: Meta<typeof Sheet> = {
    title: "Components/Sheet",
    component: Sheet,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        title: "Sheet Title",
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
            console.log(`Sheet is ${opened ? "opened" : "closed"}.`);
        },
        actions: (
            <>
                <Sheet.CancelButton />
                <Sheet.ConfirmButton />
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
                <Sheet
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
                    <DropdownMenu.Item content={"Open Sheet"} onClick={() => setOpen(true)} />
                </DropdownMenu>

                <Sheet {...props} open={open} onOpenChange={() => setOpen(false)} />
            </>
        );
    },
    args: { ...Default.args, trigger: null }
};

export const WithoutCloseButton: Story = {
    args: { ...Default.args, showCloseButton: false }
};

export const AlertSheet: Story = {
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

export const DropdownMenuInSheet: Story = {
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
