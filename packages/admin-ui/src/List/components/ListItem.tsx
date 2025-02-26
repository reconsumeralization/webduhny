import * as React from "react";
import { cn, cva, makeDecoratable, withStaticProps, type VariantProps } from "~/utils";
import { Text } from "~/Text";
import { ListItemAction } from "./ListItemAction";
import { ListItemHandle } from "./ListItemHandle";
import { ListItemIcon } from "./ListItemIcon";

const listItemVariant = cva(
    [
        "wby-w-full wby-flex wby-items-center wby-cursor-pointer",
        "group-[.wby-list-background-base]:wby-bg-neutral-base",
        "group-[.wby-list-background-light]:wby-bg-neutral-light",
        "group-[.wby-list-variant-container]:wby-rounded-sm",
        "group-[.wby-list-variant-underline]:wby-border-b-sm group-[.wby-list-variant-underline]:wby-border-b-neutral-dimmed",
        "hover:!wby-bg-neutral-dimmed",
        "focus-visible:wby-outline-none focus-visible:wby-ring-sm focus-visible:wby-ring-inset focus-visible:wby-ring-primary-dimmed"
    ],
    {
        variants: {
            disabled: {
                true: "wby-pointer-events-none wby-opacity-50"
            },
            activated: {
                true: "!wby-bg-neutral-light"
            },
            selected: {
                true: "!wby-bg-neutral-light"
            }
        }
    }
);

interface ListItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof listItemVariant> {
    title: React.ReactNode;
    actions?: React.ReactNode;
    description?: React.ReactNode;
    handle?: React.ReactNode;
    icon?: React.ReactNode;
}

const DecoratableListItem = ({
    actions,
    children,
    className,
    description,
    activated,
    disabled,
    selected,
    handle,
    icon,
    onClick,
    title,
    ...props
}: ListItemProps) => {
    return (
        <div
            {...props}
            tabIndex={0}
            className={cn(listItemVariant({ disabled, activated, selected }), className)}
        >
            {handle}
            <div
                className={
                    "wby-w-full wby-flex wby-justify-between wby-items-center wby-px-md wby-py-sm-extra"
                }
            >
                <div className={"wby-w-full wby-flex wby-items-center"} onClick={onClick}>
                    {icon && <div className={"wby-mr-md"}>{icon}</div>}
                    <div
                        className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow wby-text-left"}
                    >
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
                </div>
                {actions && (
                    <div className={"wby-flex wby-items-center wby-gap-xs-plus"}>{actions}</div>
                )}
            </div>
            {children}
        </div>
    );
};

const ListItem = withStaticProps(makeDecoratable("ListItem", DecoratableListItem), {
    Action: ListItemAction,
    Handle: ListItemHandle,
    Icon: ListItemIcon
});

export { ListItem, type ListItemProps };
