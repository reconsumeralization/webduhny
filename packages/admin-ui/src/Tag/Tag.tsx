import * as React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/round/close.svg";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";
import { Icon } from "~/Icon";
import { IconButton, iconButtonVariants } from "~/Button";

const tagVariants = cva(
    [
        "inline-flex items-center gap-xxs rounded-sm text-sm text-regular transition-colors overflow-hidden",
        "focus:outline-none"
    ],
    {
        variants: {
            isInteractive: {
                true: "cursor-pointer"
            },
            isDismissible: {
                true: "pl-xs-plus pt-xxs pb-xxs pr-xs",
                false: "px-xs-plus py-xxs"
            },
            isDisabled: {
                true: "cursor-not-allowed pointer-events-none"
            },
            variant: {
                "neutral-base": [
                    "border-sm border-solid px-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] py-[calc(theme(padding.xxs)-theme(borderWidth.sm))]",
                    "bg-transparent border-neutral-muted text-neutral-primary",
                    "hover:bg-neutral-light",
                    "aria-disabled:bg-transparent aria-disabled:border-neutral-dimmed aria-disabled:text-neutral-disabled"
                ],
                "neutral-light": [
                    "bg-neutral-muted text-neutral-primary",
                    "hover:bg-neutral-strong",
                    "aria-disabled:bg-neutral-muted aria-disabled:text-neutral-muted"
                ],
                "neutral-strong": [
                    "bg-neutral-xstrong text-neutral-light",
                    "hover:bg-neutral-dark",
                    "aria-disabled:bg-neutral-strong"
                ],
                "neutral-dark": [
                    "bg-neutral-dark text-neutral-light",
                    "hover:bg-neutral-xstrong",
                    "aria-disabled:bg-neutral-strong"
                ],
                accent: [
                    "bg-primary-default text-neutral-light",
                    "hover:bg-primary-strong",
                    "aria-disabled:bg-primary-disabled"
                ],
                success: [
                    "bg-success-default text-neutral-light",
                    "hover:bg-success-strong",
                    "aria-disabled:bg-success-disabled"
                ],
                warning: [
                    "bg-warning-muted text-neutral-primary",
                    "hover:bg-warning-default",
                    "aria-disabled:bg-warning-disabled aria-disabled:text-neutral-disabled"
                ],
                destructive: [
                    "bg-destructive-default text-neutral-light",
                    "hover:bg-destructive-strong",
                    "aria-disabled:bg-destructive-disabled"
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
            <span className={"overflow-hidden truncate whitespace-nowrap"}>{content}</span>
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
