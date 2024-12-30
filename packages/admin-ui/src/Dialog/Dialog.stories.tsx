import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "~/Button";
import { DropdownMenu } from "~/DropdownMenu";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        title: "Dialog Title",
        // description: "A short dialog description.",
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
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
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
                <Dialog {...props} open={open} onOpenChange={() => setOpen(false)} />
            </>
        );
    },
    args: {
        title: "Dialog Title",
        // description: "A short dialog description.",
        children: (
            <>
                The amazing, splendid, and most useful umbrella, resistant to rain and friendly to
                winds, is something that deserves all admiration. Crafted with perfect textures, it
                bravely withstands storms and gently shades the rays of the sun. A remarkable
                innovation, with an ergonomically designed grip most suited to the hand, it remains
                stable even in the fiercest weather.
            </>
        ),
        actions: (
            <>
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
            </>
        )
    },
    argTypes: {}
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
    args: {
        title: "Dialog Title",
        // description: "A short dialog description.",
        children: (
            <>
                The amazing, splendid, and most useful umbrella, resistant to rain and friendly to
                winds, is something that deserves all admiration. Crafted with perfect textures, it
                bravely withstands storms and gently shades the rays of the sun. A remarkable
                innovation, with an ergonomically designed grip most suited to the hand, it remains
                stable even in the fiercest weather.
            </>
        ),
        actions: (
            <>
                <Button variant={"secondary"} text={"Cancel"} />
                <Button variant={"primary"} text={"Confirm"} />
            </>
        )
    },
    argTypes: {}
};

// export const SimpleMenu: Story = {
//     args: {
//         trigger: <Button variant="primary" text={"Open"} />,
//         children: (
//             <>
//                 <Item content={"Billing"} />
//                 <Item content={"Settings"} />
//                 <Item content={"Keyboard shortcuts"} />
//             </>
//         )
//     },
//     argTypes: {}
// };
// export const SimpleMenuWithIcons: Story = {
//     args: {
//         trigger: <Button variant="primary" text={"Open"} />,
//         children: (
//             <>
//                 <Item icon={<CreditCard />} content={"Billing"} />
//                 <Item icon={<Settings />} content={"Settings"} />
//                 <Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
//             </>
//         )
//     },
//     argTypes: {}
// };
//
// export const WithSubMenus: Story = {
//     args: {
//         trigger: <Button variant="primary" text={"Open"} />,
//         children: (
//             <>
//                 <Label content={"My Account"} />
//                 <Item icon={<User />} content={"Profile"} />
//                 <Group>
//                     <Item icon={<CreditCard />} content={"Billing"} />
//                     <Item icon={<Settings />} content={"Settings"} />
//                     <Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
//                 </Group>
//                 <Separator />
//                 <Group>
//                     <Item icon={<Users />} content={"Team"} />
//                     <Item icon={<UserPlus />} content={"Invite users"}>
//                         <Item icon={<Mail />} content={"Email"} />
//                         <Item icon={<MessageSquare />} content={"Message"} />
//                         <Separator />
//                         <Item icon={<PlusCircle />} content={"More..."}>
//                             <Item icon={<Mail />} content={"Email"} />
//                             <Item icon={<MessageSquare />} content={"Message"} />
//                             <Separator />
//                             <Item icon={<PlusCircle />} content={"More..."} />
//                         </Item>
//                     </Item>
//                     <Item icon={<Plus />} content={"New Team"} />
//                 </Group>
//                 <Separator />
//                 <Item icon={<LifeBuoy />} content={"Support"} />
//                 <Item icon={<Cloud />} content={"API"} disabled />
//                 <Separator />
//                 <Item icon={<LogOut />} content={"Log out"} />
//             </>
//         )
//     },
//     argTypes: {}
// };
//
// export const WithOnOpenChange: Story = {
//     args: {
//         trigger: <Button variant="primary" text={"Open"} />,
//         onOpenChange: opened => {
//             console.log(`Menu is ${opened ? "opened" : "closed"}.`);
//         },
//         children: (
//             <>
//                 <Item icon={<CreditCard />} content={"Billing"} />
//                 <Item icon={<Settings />} content={"Settings"} />
//                 <Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
//             </>
//         )
//     },
//     argTypes: {}
// };
