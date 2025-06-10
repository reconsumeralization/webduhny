import * as React from "react";
import { ReactComponent as Close } from "@webiny/icons/close.svg";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { Icon, type IconProps } from "~/Icon";
import { IconButton, iconButtonVariants } from "~/Button";

const tagVariants = cva(
    [
        "wby-inline-flex wby-items-center wby-gap-xxs wby-rounded-sm wby-text-sm wby-text-regular wby-transition-colors wby-overflow-hidden",
        "focus:outline-none"
    ],
    {
        variants: {
            isInteractive: {
                true: "wby-cursor-pointer"
            },
            isDismissible: {
                true: "wby-pl-xs-plus wby-pt-xxs wby-pb-xxs wby-pr-xs",
                false: "wby-px-xs-plus wby-py-xxs"
            },
            isDisabled: {
                true: "wby-cursor-not-allowed wby-pointer-events-none"
            },
            variant: {
                "neutral-base": [
                    "wby-bg-transparent wby-text-neutral-primary",
                    "hover:wby-bg-neutral-light",
                    "aria-disabled:wby-bg-transparent aria-disabled:wby-text-neutral-disabled"
                ],
                "neutral-base-outline": [
                    "wby-border-sm wby-border-solid wby-px-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-py-[calc(theme(padding.xxs)-theme(borderWidth.sm))]",
                    "wby-bg-transparent wby-border-neutral-muted wby-text-neutral-primary",
                    "hover:wby-bg-neutral-light",
                    "aria-disabled:wby-bg-transparent aria-disabled:wby-border-neutral-dimmed aria-disabled:wby-text-neutral-disabled"
                ],
                "neutral-light": [
                    "wby-bg-neutral-light wby-text-neutral-primary",
                    "hover:wby-bg-neutral-muted",
                    "aria-disabled:wby-bg-neutral-light aria-disabled:wby-text-neutral-muted"
                ],
                "neutral-muted": [
                    "wby-bg-neutral-muted wby-text-neutral-primary",
                    "hover:wby-bg-neutral-strong",
                    "aria-disabled:wby-bg-neutral-muted aria-disabled:wby-text-neutral-muted"
                ],
                "neutral-strong": [
                    "wby-bg-neutral-strong wby-text-neutral-light",
                    "hover:wby-bg-neutral-xstrong",
                    "aria-disabled:wby-bg-neutral-muted"
                ],
                "neutral-xstrong": [
                    "wby-bg-neutral-xstrong wby-text-neutral-light",
                    "hover:wby-bg-neutral-dark",
                    "aria-disabled:wby-bg-neutral-strong"
                ],
                "neutral-dark": [
                    "wby-bg-neutral-dark wby-text-neutral-light",
                    "hover:wby-bg-neutral-xstrong",
                    "aria-disabled:wby-bg-neutral-strong"
                ],
                accent: [
                    "wby-bg-primary-default wby-text-neutral-light",
                    "hover:wby-bg-primary-strong",
                    "aria-disabled:wby-bg-primary-disabled"
                ],
                "accent-light": [
                    "wby-bg-primary-subtle wby-text-neutral-primary",
                    "hover:wby-bg-primary-muted",
                    "aria-disabled:wby-bg-primary-subtle aria-disabled:wby-text-neutral-muted"
                ],
                success: [
                    "wby-bg-success-default wby-text-neutral-light",
                    "hover:wby-bg-success-strong",
                    "aria-disabled:wby-bg-success-disabled"
                ],
                "success-light": [
                    "wby-bg-success-subtle wby-text-neutral-primary",
                    "hover:wby-bg-success-muted",
                    "aria-disabled:wby-bg-success-subtle aria-disabled:wby-text-neutral-muted"
                ],
                warning: [
                    "wby-bg-warning-muted wby-text-neutral-primary",
                    "hover:wby-bg-warning-default",
                    "aria-disabled:wby-bg-warning-disabled aria-disabled:wby-text-neutral-disabled"
                ],
                destructive: [
                    "wby-bg-destructive-default wby-text-neutral-light",
                    "hover:wby-bg-destructive-strong",
                    "aria-disabled:wby-bg-destructive-disabled"
                ]
            }
        },
        defaultVariants: {
            variant: "neutral-base"
        }
    }
);

export interface TagProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "content">,
        VariantProps<typeof tagVariants> {
    content: React.ReactNode;
    onDismiss?: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
    dismissIconElement?: React.ReactElement;
    dismissIconLabel?: string;
    disabled?: boolean;
}

const DecoratableTag = ({
    className,
    variant,
    content,
    onClick,
    onDismiss,
    dismissIconElement = <Close />,
    dismissIconLabel = "Close",
    disabled,
    ...props
}: TagProps) => {
    const dismissButtonVariant = React.useMemo((): VariantProps<
        typeof iconButtonVariants
    >["variant"] => {
        if (
            variant &&
            [
                "neutral-strong",
                "neutral-xstrong",
                "neutral-dark",
                "success",
                "accent",
                "destructive"
            ].includes(variant)
        ) {
            return "ghost-negative";
        }

        return "ghost";
    }, [variant]);

    const dismissIconColor: IconProps["color"] = React.useMemo(() => {
        if (
            variant &&
            [
                "neutral-strong",
                "neutral-xstrong",
                "neutral-dark",
                "accent",
                "success",
                "destructive"
            ].includes(variant)
        ) {
            return "neutral-negative";
        }

        if (variant && ["warning"].includes(variant)) {
            return "neutral-strong";
        }

        return "neutral-strong-transparent";
    }, [variant]);

    return (
        <span
            {...props}
            onClick={onClick}
            className={cn(
                tagVariants({
                    variant,
                    isDismissible: Boolean(onDismiss),
                    isInteractive: Boolean(onClick),
                    isDisabled: Boolean(disabled)
                }),
                className
            )}
            aria-disabled={disabled}
        >
            <span className={"wby-overflow-hidden wby-truncate wby-whitespace-nowrap"}>
                {content}
            </span>
            {onDismiss && (
                <IconButton
                    icon={
                        <Icon
                            icon={dismissIconElement}
                            label={dismissIconLabel}
                            color={dismissIconColor}
                            size={"sm"}
                        />
                    }
                    size={"xxs"}
                    variant={dismissButtonVariant}
                    disabled={disabled}
                    onClick={event => {
                        event.stopPropagation();
                        onDismiss(event);
                    }}
                />
            )}
        </span>
    );
};
const Tag = makeDecoratable("Tag", DecoratableTag);

export { Tag };
