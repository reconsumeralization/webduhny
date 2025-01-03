import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "./Sheet";
import { Button } from "~/Button";
import { DropdownMenu } from "~/DropdownMenu";
import { Tabs, TabsContent, TabsTrigger } from "~/Tabs";

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

export const CustomWidth: Story = {
    args: { ...Default.args, width: "1000px" }
};

export const WithSeparators: Story = {
    args: { ...Default.args, separators: true }
};

export const WithTabs: Story = {
    args: {
        ...Default.args,
        separators: true,
        children: (
            <>
                <Tabs
                    triggers={[
                        <TabsTrigger key="account" value="account" text={"Account"} />,
                        <TabsTrigger key="company" value="company" text={"Company"} />,
                        <TabsTrigger key="security" value="security" text={"Security"} />,
                        <TabsTrigger key="development" value="development" text={"development"} />
                    ]}
                    contents={[
                        <TabsContent
                            key="account"
                            value="account"
                            text={"Make changes to your account here."}
                        />,
                        <TabsContent
                            key="company"
                            value="company"
                            text={"Make changes to your company info here."}
                        />,
                        <TabsContent
                            key="security"
                            value="security"
                            text={"Make changes to your security settings here."}
                        />,
                        <TabsContent
                            key="development"
                            value="development"
                            text={"Make changes to your development settings here."}
                        />
                    ]}
                />
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
