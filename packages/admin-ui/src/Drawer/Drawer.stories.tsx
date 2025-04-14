import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "~/Button";
import { DropdownMenu } from "~/DropdownMenu";
import { Tabs } from "~/Tabs";
import { ReactComponent as DoorbellIcon } from "@webiny/icons/ring_volume.svg";

const meta: Meta<typeof Drawer> = {
    title: "Components/Drawer",
    component: Drawer,
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        title: "Drawer Title",
        description: "A short dialog description.",
        info: (
            <>
                Learn more about this <a href={"#"}>here</a>.
            </>
        ),
        children: (
            <>
                <p className={"wby-mb-md"}>
                    The amazing, splendid, and most useful umbrella, resistant to rain and friendly
                    to winds, is something that deserves all admiration. Crafted with perfect
                    textures, it bravely withstands storms and gently shades the rays of the sun. A
                    remarkable innovation, with an ergonomically designed grip most suited to the
                    hand, it remains stable even in the fiercest weather.
                </p>
                <p className={"wby-mb-md"}>
                    Its fabric, woven from the highest quality materials, ensures that you stay dry,
                    no matter the intensity of the rain. With a frame engineered for strength yet
                    lightweight enough to carry with ease, this umbrella is a marvel of modern
                    design. Not just a shield against the elements, but a companion in your everyday
                    journey, it provides peace of mind, knowing you’re prepared for whatever the
                    skies may bring.
                </p>
                <p className={"wby-mb-md"}>
                    The sleek, stylish design complements any outfit, making it not only a practical
                    accessory but also a fashion statement. With its smooth opening mechanism, you
                    can effortlessly transition from a sunny day to a rainy one without missing a
                    beat. Whether you are navigating through a busy city street or enjoying a quiet
                    stroll in the park, this umbrella offers unmatched comfort and protection.
                </p>
                <p className={"wby-mb-md"}>
                    Indeed, it is not just an umbrella — it is an experience. One that elevates your
                    daily routine, making every step in both sun and storm feel just a little bit
                    brighter.
                </p>
            </>
        ),
        onOpenChange: opened => {
            console.log(`Drawer is ${opened ? "opened" : "closed"}.`);
        },
        actions: (
            <>
                <Drawer.CancelButton />
                <Drawer.ConfirmButton />
            </>
        ),
        bodyPadding: true,
        headerSeparator: true,
        footerSeparator: true
    },
    argTypes: {}
};

export const ControlledVisibility: Story = {
    render: props => {
        const [open, setOpen] = React.useState(false);

        return (
            <>
                <Button variant="primary" text={"Open"} onClick={() => setOpen(true)} />
                <Drawer
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
                    <DropdownMenu.Item content={"Open Drawer"} onClick={() => setOpen(true)} />
                </DropdownMenu>

                <Drawer {...props} open={open} onOpenChange={() => setOpen(false)} />
            </>
        );
    },
    args: { ...Default.args, trigger: null }
};

export const WithoutCloseButton: Story = {
    args: { ...Default.args, showCloseButton: false }
};

export const CustomWidth: Story = {
    args: { ...Default.args, width: 1000 }
};

export const WithTabs: Story = {
    args: {
        ...Default.args,
        bodyPadding: false,
        headerSeparator: false,
        children: (
            <>
                <Tabs
                    spacing={"lg"}
                    tabs={[
                        <Tabs.Tab
                            key="account"
                            value="account"
                            trigger={"Account"}
                            content={"Make changes to your account here."}
                        />,
                        <Tabs.Tab
                            key="company"
                            value="company"
                            trigger={"Company"}
                            content={"Make changes to your company info here."}
                        />,
                        <Tabs.Tab
                            key="security"
                            value="security"
                            trigger={"Security"}
                            content={"Make changes to your security settings here."}
                        />,
                        <Tabs.Tab
                            key="development"
                            value="development"
                            trigger={"Development"}
                            content={"Make changes to your development settings here."}
                        />
                    ]}
                />
            </>
        )
    }
};

export const DropdownMenuInDrawer: Story = {
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
        icon: <Drawer.Icon icon={<DoorbellIcon />} label={"Icon label..."} />
    }
};

export const AsModal: Story = {
    args: {
        ...Default.args,
        modal: true
    }
};
