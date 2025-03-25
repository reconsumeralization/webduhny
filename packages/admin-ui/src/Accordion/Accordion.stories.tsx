import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, type AccordionItemProps as BaseAccordionItemProps } from "./Accordion";

import { ReactComponent as WarningIcon } from "@material-design-icons/svg/outlined/insert_chart.svg";
import { ReactComponent as ArrowUp } from "@material-design-icons/svg/outlined/arrow_upward.svg";
import { ReactComponent as ArrowDown } from "@material-design-icons/svg/outlined/arrow_downward.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";
import { Button } from "~/Button";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        Story => (
            <div className="wby-w-[750px] wby-p-[50px] wby-min-h-[500px] wby-bg-[#f6f7f8]">
                <Story />
            </div>
        )
    ],
    render: args => {
        return <Accordion {...args} />;
    }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

interface AccordionItemProps extends Omit<BaseAccordionItemProps, "value" | "title" | "children"> {
    index: number;
}

const AccordionItem = (props: AccordionItemProps) => {
    return (
        <Accordion.Item title={`Accordion item ${props.index}`} {...props}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit sem, pretium sit amet
            convallis nec, consequat non nulla. Nunc sit amet sagittis tellus. Etiam venenatis, odio
            sed consectetur consectetur, quam quam blandit ante, semper maximus lorem est vel dolor.
            Praesent ac neque rutrum, elementum turpis et, vulputate enim. In ex lorem,
        </Accordion.Item>
    );
};

export const Default: Story = {
    args: {
        children: (
            <>
                <AccordionItem index={1} />
                <AccordionItem index={2} />
                <AccordionItem index={3} />
            </>
        )
    }
};

export const WithDescriptions: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={3}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
            </>
        )
    },
    argTypes: {}
};

export const WithIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
            </>
        )
    }
};

export const WithActionsIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    actions={
                        <>
                            <Accordion.Item.Action icon={<ArrowUp />} />
                            <Accordion.Item.Action icon={<ArrowDown />} />
                            <Accordion.Item.Action.Separator />
                            <Accordion.Item.Action icon={<EditIcon />} />
                            <Accordion.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    actions={
                        <>
                            <Accordion.Item.Action icon={<ArrowUp />} />
                            <Accordion.Item.Action icon={<ArrowDown />} />
                            <Accordion.Item.Action.Separator />
                            <Accordion.Item.Action icon={<EditIcon />} />
                            <Accordion.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};

export const WithHandleIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    handle={<Accordion.Item.Handle />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<Accordion.Item.Handle />}
                />
            </>
        )
    }
};

export const WithNotInteractiveItem: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem index={1} description="Not interactive item." interactive={false} />
                <AccordionItem index={2} />
                <AccordionItem index={3} />
            </>
        )
    }
};

export const WithDefaultOpenedItem: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    defaultOpen={true}
                />
            </>
        )
    }
};

export const WithDisabledItem: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    disabled={true}
                />
                <AccordionItem
                    index={3}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    defaultOpen={true}
                    disabled={true}
                />
            </>
        )
    }
};

export const WithControlledOpenedItem: Story = {
    ...Default,
    render: args => {
        const [openFirstItem, setOpenFirstItem] = useState<boolean>();
        const [openSecondItem, setOpenSecondItem] = useState<boolean>();
        const [openThirdItem, setOpenThirdItem] = useState<boolean>();

        return (
            <>
                <Accordion {...args}>
                    <AccordionItem
                        index={1}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        defaultOpen={openFirstItem}
                    />
                    <AccordionItem
                        index={2}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        defaultOpen={openSecondItem}
                    />
                    <AccordionItem
                        index={3}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        defaultOpen={openThirdItem}
                    />
                </Accordion>
                <div className={"wby-flex wby-justify-center wby-mt-lg wby-gap-md"}>
                    <Button
                        onClick={() => setOpenFirstItem(!openFirstItem)}
                        text={"Trigger First Item"}
                    />
                    <Button
                        onClick={() => setOpenSecondItem(!openSecondItem)}
                        text={"Trigger Second Item"}
                    />
                    <Button
                        onClick={() => setOpenThirdItem(!openThirdItem)}
                        text={"Trigger Third Item"}
                    />
                </div>
            </>
        );
    }
};

export const ContainerVariant: Story = {
    ...Default,
    args: {
        variant: "container",
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
            </>
        )
    }
};

export const LightBackground: Story = {
    ...Default,
    decorators: [
        Story => (
            <div className="wby-w-[750px] wby-p-[50px] wby-min-h-[500px]">
                <Story />
            </div>
        )
    ],
    args: {
        background: "light",
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
            </>
        )
    }
};

export const ContainerVariantWithLightBackground: Story = {
    ...Default,
    decorators: [
        Story => (
            <div className="wby-w-[750px] wby-p-[50px] wby-min-h-[500px]">
                <Story />
            </div>
        )
    ],
    args: {
        variant: "container",
        background: "light",
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
            </>
        )
    }
};
