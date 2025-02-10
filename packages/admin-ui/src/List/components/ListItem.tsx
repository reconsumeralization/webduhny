import * as React from "react";
import { cn, cva, makeDecoratable, type VariantProps, withStaticProps } from "~/utils";
import { Text } from "~/Text";
import { ListItemAction } from "./ListItemAction";
import { ListItemHandle } from "./ListItemHandle";
import { ListItemIcon } from "./ListItemIcon";

const listItemVariants = cva(
    [
        "wby-w-full wby-flex wby-items-center wby-cursor-pointer",
        "group-[.wby-list-background-base]:wby-bg-neutral-base",
        "group-[.wby-list-background-light]:wby-bg-neutral-light",
        "group-[.wby-list-variant-container]:wby-rounded-sm",
        "group-[.wby-list-variant-underline]:wby-border-b-sm group-[.wby-list-variant-underline]:wby-border-b-neutral-dimmed",
        "wby-w-full wby-flex wby-items-center wby-cursor-pointer",
        "focus-visible:wby-outline-none focus-visible:wby-border-none focus-visible:wby-ring-sm focus-visible:wby-ring-primary-dimmed",
        "hover:wby-bg-neutral-dimmed"
    ],
    {
        variants: {
            disabled: {
                true: ""
            }
        }
    }
);

interface ListItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof listItemVariants> {
    title: React.ReactNode;
    actions?: React.ReactNode;
    description?: React.ReactNode;
    handle?: React.ReactNode;
    icon?: React.ReactNode;
}

const DecoratableListItem = ({
    actions,
    className,
    description,
    disabled,
    handle,
    icon,
    title
}: ListItemProps) => {
    return (
        <div className={cn(listItemVariants({ disabled }), className)}>
            {handle}
            <div
                className={
                    "wby-w-full wby-flex wby-justify-between wby-items-center wby-px-md wby-py-sm-extra"
                }
            >
                {icon && <div className={"wby-mr-md"}>{icon}</div>}
                <div className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow wby-text-left"}>
                    <Text
                        size={"md"}
                        text={title}
                        as={"div"}
                        className={"wby-font-semibold wby-text-neutral-primary"}
                    />
                    <Text
                        size={"sm"}
                        text={description}
                        as={"div"}
                        className={"wby-text-neutral-strong"}
                    />
                </div>
                {actions && <div className={"wby-flex wby-gap-xs-plus"}>{actions}</div>}
            </div>
        </div>
    );
};

const ListItem = withStaticProps(makeDecoratable("ListItem", DecoratableListItem), {
    Action: ListItemAction,
    Handle: ListItemHandle,
    Icon: ListItemIcon
});

export { ListItem, type ListItemProps };
