import React from "react";
import { ReactComponent as ChartIcon } from "@webiny/icons/insert_chart.svg";
import { ReactComponent as MoreIcon } from "@webiny/icons/more_vert.svg";
import { ReactComponent as OpenIcon } from "@webiny/icons/visibility.svg";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as TrashIcon } from "@webiny/icons/delete.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { List, type ListItemProps as BaseListItemProps } from "./List";
import { Avatar } from "~/Avatar";

const meta: Meta<typeof List> = {
    title: "Components/List",
    component: List,
    tags: ["autodocs"],
    parameters: {
        layout: "padded"
    }
};

export default meta;

type Story = StoryObj<typeof List>;

interface ListItemProps extends Omit<BaseListItemProps, "title"> {
    index: number;
}

const ListItem = (props: ListItemProps) => {
    return <List.Item title={`List item ${props.index}`} {...props} />;
};

export const Default: Story = {
    args: {
        children: (
            <>
                <ListItem index={1} />
                <ListItem index={2} />
                <ListItem index={3} />
            </>
        )
    }
};

export const WithTransparentBackground: Story = {
    args: {
        ...Default.args,
        background: "transparent"
    },
    decorators: [
        Story => (
            <div className="wby-bg-neutral-light wby-p-md">
                <Story />
            </div>
        )
    ]
};

export const WithBaseBackground: Story = {
    args: {
        ...Default.args,
        background: "base"
    }
};

export const WithLightBackground: Story = {
    args: {
        ...Default.args,
        background: "light"
    }
};

export const WithUnderlineVariant: Story = {
    args: {
        ...Default.args,
        variant: "underline"
    }
};

export const WithContainerVariant: Story = {
    args: {
        ...Default.args,
        variant: "container"
    },
    decorators: [
        Story => (
            <div className="wby-bg-neutral-light wby-p-md">
                <Story />
            </div>
        )
    ]
};

export const WithDescription: Story = {
    ...Default,
    args: {
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <ListItem
                    index={3}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
            </>
        )
    }
};

export const WithIcon: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
                />
            </>
        )
    }
};

export const WithAvatar: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=1" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=2" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                />
            </>
        )
    }
};

export const WithHandle: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                />
            </>
        )
    }
};

export const WithActions: Story = {
    ...Default,
    args: {
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};

export const WithDisabled: Story = {
    args: {
        ...WithAvatar.args,
        children: (
            <>
                <ListItem
                    disabled={true}
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=1" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=2" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};

export const WithActivated: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem
                    activated={true}
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=1" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<List.Item.Handle />}
                    icon={
                        <Avatar
                            image={
                                <Avatar.Image src="https://i.pravatar.cc/300?img=2" alt="@webiny" />
                            }
                            fallback={<Avatar.Fallback>W</Avatar.Fallback>}
                        />
                    }
                    actions={
                        <>
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<OpenIcon />} />
                            <List.Item.Action icon={<MoreIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};
