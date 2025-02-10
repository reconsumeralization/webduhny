import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List, type ListItemProps as BaseListItemProps } from "./List";

import { ReactComponent as ChartIcon } from "@material-design-icons/svg/outlined/insert_chart.svg";
import { ReactComponent as ArrowUp } from "@material-design-icons/svg/outlined/arrow_upward.svg";
import { ReactComponent as ArrowDown } from "@material-design-icons/svg/outlined/arrow_downward.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";

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

export const WithDisabledItem: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem index={1} disabled={true} />
                <ListItem index={2} />
                <ListItem index={3} />
            </>
        )
    }
};

export const WithActionsIcon: Story = {
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
                            <List.Item.Action icon={<ArrowUp />} />
                            <List.Item.Action icon={<ArrowDown />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
                <ListItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
                    actions={
                        <>
                            <List.Item.Action icon={<ArrowUp />} />
                            <List.Item.Action icon={<ArrowDown />} />
                            <List.Item.Action.Separator />
                            <List.Item.Action icon={<EditIcon />} />
                            <List.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};

export const WithHandleIcon: Story = {
    args: {
        ...Default.args,
        children: (
            <>
                <ListItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<List.Item.Icon icon={<ChartIcon />} label={"Chart"} />}
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
