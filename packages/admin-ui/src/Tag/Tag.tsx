import * as React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/round/close.svg";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { Icon } from "~/Icon";
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
                    "wby-border-sm wby-border-solid wby-px-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-py-[calc(theme(padding.xxs)-theme(borderWidth.sm))]",
                    "wby-bg-transparent wby-border-neutral-muted wby-text-neutral-primary",
                    "hover:wby-bg-neutral-light",
                    "aria-disabled:wby-bg-transparent aria-disabled:wby-border-neutral-dimmed aria-disabled:wby-text-neutral-disabled"
                ],
                "neutral-light": [
                    "wby-bg-neutral-muted wby-text-neutral-primary",
                    "hover:wby-bg-neutral-strong",
                    "aria-disabled:wby-bg-neutral-muted aria-disabled:wby-text-neutral-muted"
                ],
                "neutral-strong": [
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
                success: [
                    "wby-bg-success-default wby-text-neutral-light",
                    "hover:wby-bg-success-strong",
                    "aria-disabled:wby-bg-success-disabled"
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
    const iconVariant = React.useMemo((): VariantProps<typeof iconButtonVariants>["variant"] => {
        if (
            variant &&
            ["neutral-strong", "neutral-dark", "success", "accent", "destructive"].includes(variant)
        ) {
            return "ghost-negative";
        }

        return "ghost";
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
                    icon={<Icon icon={dismissIconElement} label={dismissIconLabel} size={"sm"} />}
                    size={"xxs"}
                    variant={iconVariant}
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
