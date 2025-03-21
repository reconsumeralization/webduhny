import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "~/Button";
import { ReactComponent as Cloud } from "@material-design-icons/svg/outlined/cloud.svg";
import { ReactComponent as LogOut } from "@material-design-icons/svg/outlined/logout.svg";
import { ReactComponent as LifeBuoy } from "@material-design-icons/svg/outlined/safety_check.svg";
import { ReactComponent as CreditCard } from "@material-design-icons/svg/outlined/credit_score.svg";
import { ReactComponent as Plus } from "@material-design-icons/svg/outlined/add.svg";
import { ReactComponent as PlusCircle } from "@material-design-icons/svg/outlined/add_circle.svg";
import { ReactComponent as Settings } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as Users } from "@material-design-icons/svg/outlined/people.svg";
import { ReactComponent as UserPlus } from "@material-design-icons/svg/outlined/person_add.svg";
import { ReactComponent as User } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as Keyboard } from "@material-design-icons/svg/outlined/keyboard.svg";
import { ReactComponent as Mail } from "@material-design-icons/svg/outlined/mail.svg";
import { ReactComponent as MessageSquare } from "@material-design-icons/svg/outlined/chat_bubble.svg";
import { ReactComponent as LinkIcon } from "@material-design-icons/svg/outlined/link.svg";
import { Text } from "~/Text";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/Dropdown Menu",
    component: DropdownMenu,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const { Label, Separator, Group, Item, Link, CheckboxItem } = DropdownMenu;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                <Label text={"My Account"} />
                <Item icon={<Item.Icon label={"Profile"} element={<User />} />} text={"Profile"} />
                <Group>
                    <Item
                        icon={<Item.Icon element={<CreditCard />} label={"Billing"} />}
                        text={"Billing"}
                    />
                    <Item
                        icon={<Item.Icon element={<Settings />} label={"Settings"} />}
                        text={"Settings"}
                    />
                    <Item
                        icon={<Item.Icon element={<Keyboard />} label={"Keyboard shortcuts"} />}
                        text={"Keyboard shortcuts"}
                    />
                </Group>
                <Separator />
                <Group>
                    <Item icon={<Item.Icon element={<Users />} label={"Team"} />} text={"Team"} />
                    <Item
                        icon={<Item.Icon element={<UserPlus />} label={"Invite users"} />}
                        text={"Invite users"}
                    >
                        <Item
                            icon={<Item.Icon element={<Mail />} label={"Email"} />}
                            text={"Email"}
                        />
                        <Item
                            icon={<Item.Icon element={<MessageSquare />} label={"Message"} />}
                            text={"Message"}
                        />
                        <Separator />
                        <Item
                            icon={<Item.Icon label={"More..."} element={<PlusCircle />} />}
                            text={"More..."}
                        />
                    </Item>
                    <Item
                        icon={<Item.Icon label={"New Team"} element={<Plus />} />}
                        text={"New Team"}
                    />
                </Group>
                <Separator />
                <Item
                    icon={<Item.Icon label={"Support"} element={<LifeBuoy />} />}
                    text={"Support"}
                />
                <Item
                    icon={<Item.Icon label={"API"} element={<Cloud />} />}
                    text={"API"}
                    disabled
                />
                <Separator />
                <Item
                    icon={<Item.Icon label={"Log out"} element={<LogOut />} />}
                    text={"Log out"}
                />
                <Separator />
                <Label text={"Links"} />
                <Link
                    text={"Link 1"}
                    to={"#link-1"}
                    icon={<Link.Icon label="Link 1" element={<LinkIcon />} />}
                />
                <Link
                    text={"Link 2"}
                    to={"#link-2"}
                    icon={<Link.Icon label="Link 2" element={<LinkIcon />} />}
                />
                <Link
                    text={"Link 3"}
                    to={"#link-3"}
                    icon={<Link.Icon label="Link 3" element={<LinkIcon />} />}
                />
            </>
        )
    },
    argTypes: {}
};

export const SimpleMenuWithIcons: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                <Item
                    icon={<Item.Icon label={"Billing"} element={<CreditCard />} />}
                    text={"Billing"}
                />
                <Item
                    icon={<Item.Icon label={"Settings"} element={<Settings />} />}
                    text={"Settings"}
                />
                <Item
                    icon={<Item.Icon label={"Keyboard shortcuts"} element={<Keyboard />} />}
                    text={"Keyboard shortcuts"}
                />
            </>
        )
    },
    argTypes: {}
};

export const WithSubMenus: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                <Label text={"My Account"} />
                <Item icon={<Item.Icon element={<User />} label={"Profile"} />} text={"Profile"} />
                <Group>
                    <Item
                        icon={<Item.Icon label={"Billing"} element={<CreditCard />} />}
                        text={"Billing"}
                    />
                    <Item
                        icon={<Item.Icon label={"Settings"} element={<Settings />} />}
                        text={"Settings"}
                    />
                    <Item
                        icon={<Item.Icon label={"Keyboard shortcuts"} element={<Keyboard />} />}
                        text={"Keyboard shortcuts"}
                    />
                </Group>
                <Separator />
                <Group>
                    <Item icon={<Item.Icon label={"Team"} element={<Users />} />} text={"Team"} />
                    <Item
                        icon={<Item.Icon label={"Invite user"} element={<UserPlus />} />}
                        text={"Invite users"}
                    >
                        <Item
                            icon={<Item.Icon label={"Email"} element={<Mail />} />}
                            text={"Email"}
                        />
                        <Item
                            icon={<Item.Icon label={"Message"} element={<MessageSquare />} />}
                            text={"Message"}
                        />
                        <Separator />
                        <Item
                            icon={<Item.Icon label={"More..."} element={<PlusCircle />} />}
                            text={"More..."}
                        >
                            <Item
                                icon={<Item.Icon label={"Email"} element={<Mail />} />}
                                text={"Email"}
                            />
                            <Item
                                icon={<Item.Icon label={"Message"} element={<MessageSquare />} />}
                                text={"Message"}
                            />
                            <Separator />
                            <Item
                                icon={<Item.Icon label={"More..."} element={<PlusCircle />} />}
                                text={"More..."}
                            />
                        </Item>
                    </Item>
                    <Item
                        icon={<Item.Icon label={"New Team"} element={<Plus />} />}
                        text={"New Team"}
                    />
                </Group>
                <Separator />
                <Item
                    icon={<Item.Icon label={"Support"} element={<LifeBuoy />} />}
                    text={"Support"}
                />
                <Item
                    icon={<Item.Icon label={"API"} element={<Cloud />} />}
                    text={"API"}
                    disabled
                />
                <Separator />
                <Item
                    icon={<Item.Icon label={"Log out"} element={<LogOut />} />}
                    text={"Log out"}
                />
            </>
        )
    },
    argTypes: {}
};

const TARGET_LEVELS = [
    {
        id: "viewer",
        label: "Viewer",
        description: "Can view content, but not modify it"
    },
    {
        id: "editor",
        label: "Editor",
        description: "Can view and modify content"
    },
    {
        id: "owner",
        label: "Owner",
        description: "Can edit and manage content permissions"
    }
];

export const WithCheckboxItems: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                {TARGET_LEVELS.map(level => (
                    <CheckboxItem
                        key={level.id}
                        checked={level.id === "viewer"}
                        text={
                            <div>
                                <Text as={"div"} text={level.label} />
                                <Text
                                    as={"div"}
                                    text={level.description}
                                    size={"sm"}
                                    className={"wby-text-neutral-strong"}
                                />
                            </div>
                        }
                        onClick={() => {
                            console.log("Selected level:", level.id);
                        }}
                    />
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Item text={"Remove access"} />
            </>
        )
    },
    argTypes: {}
};

export const WithOnOpenChange: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        onOpenChange: opened => {
            console.log(`Menu is ${opened ? "opened" : "closed"}.`);
        },
        children: (
            <>
                <Item
                    icon={<Item.Icon element={<CreditCard />} label={"Billing"} />}
                    text={"Billing"}
                />
                <Item
                    icon={<Item.Icon element={<Settings />} label={"Settings"} />}
                    text={"Settings"}
                />
                <Item
                    icon={<Item.Icon element={<Keyboard />} label={"Keyboard shortcuts"} />}
                    text={"Keyboard shortcuts"}
                />
            </>
        )
    },
    argTypes: {}
};
