import * as React from "react";
import { cn, cva, makeDecoratable, withStaticProps, type VariantProps } from "~/utils";
import { Text } from "~/Text";
import { ListItemAction } from "./ListItemAction";
import { ListItemHandle } from "./ListItemHandle";
import { ListItemIcon } from "./ListItemIcon";

const listItemVariant = cva(
    [
        "wby-w-full wby-flex wby-items-center",
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
            },
            clickable: {
                true: "wby-cursor-pointer"
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
            className={cn(
                listItemVariant({ disabled, activated, selected, clickable: Boolean(onClick) }),
                className
            )}
        >
            {handle}
            <div
                className={
                    "wby-w-full wby-flex wby-justify-between wby-items-center wby-pl-lg wby-pr-md wby-py-sm-extra"
                }
            >
                <div
                    className={"wby-w-full wby-flex wby-items-center wby-gap-md"}
                    onClick={onClick}
                >
                    {icon && <div>{icon}</div>}
                    <div
                        className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow wby-text-left"}
                    >
                        <Text
                            size={"md"}
                            as={"div"}
                            className={"wby-font-semibold wby-text-neutral-primary"}
                        >
                            {title}
                        </Text>
                        <Text size={"sm"} as={"div"} className={"wby-text-neutral-strong"}>
                            {description}
                        </Text>
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
