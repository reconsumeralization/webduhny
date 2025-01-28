import * as React from "react";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Icon } from "~/Icon";
import { Text } from "~/Text";
import { Tooltip } from "~/Tooltip";
import { cn, makeDecoratable, cva, type VariantProps } from "~/utils";

/**
 * Label Required
 */
const labelRequiredVariants = cva("wby-text-destructive-primary", {
    variants: {
        disabled: {
            true: "wby-text-destructive-muted"
        }
    }
});

type LabelRequiredProps = VariantProps<typeof labelRequiredVariants>;

const DecoratableLabelRequired = ({ disabled }: LabelRequiredProps) => (
    <span className={cn(labelRequiredVariants({ disabled }))}>{"*"}</span>
);
const LabelRequired = makeDecoratable("LabelRequired", DecoratableLabelRequired);

/**
 * Label Description
 */
const labelDescriptionVariants = cva("wby-font-normal wby-text-neutral-strong", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    }
});

interface LabelDescriptionProps extends VariantProps<typeof labelDescriptionVariants> {
    content: React.ReactNode;
}

const DecoratableLabelDescription = ({ content, disabled }: LabelDescriptionProps) => (
    <Text className={cn(labelDescriptionVariants({ disabled }))} text={content} size={"sm"} />
);
const LabelDescription = makeDecoratable("LabelDescription", DecoratableLabelDescription);

/**
 * Label Hint
 */
interface LabelHintProps {
    content: React.ReactNode;
}

const DecoratableLabelHint = ({ content }: LabelHintProps) => (
    <Tooltip
        content={content}
        trigger={
            <Icon
                icon={<InfoIcon />}
                size="xs"
                label={"More information"}
                color={"neutral-light"}
            />
        }
    />
);
const LabelHint = makeDecoratable("LabelHint", DecoratableLabelHint);

/**
 * Label Value
 */
const labelValueVariants = cva("wby-text-neutral-strong", {
    variants: {
        weight: {
            strong: "wby-font-semibold",
            light: "wby-font-regular"
        },
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    },
    defaultVariants: {
        weight: "strong"
    }
});

interface LabelValueProps extends VariantProps<typeof labelValueVariants> {
    value: React.ReactNode;
}

const DecoratableLabelValue = ({ value, weight, disabled }: LabelValueProps) => (
    <Text text={value} size="sm" className={cn(labelValueVariants({ weight, disabled }))} />
);
const LabelValue = makeDecoratable("LabelValue", DecoratableLabelValue);

const labelVariants = cva(
    [
        "wby-inline-flex wby-items-center wby-justify-between wby-w-full wby-text-sm",
        "wby-text-neutral-primary",
        "peer-disabled:wby-text-neutral-disabled peer-disabled:wby-cursor-not-allowed"
    ],
    {
        variants: {
            weight: {
                strong: "wby-font-semibold",
                light: "wby-font-regular"
            },
            disabled: {
                true: "wby-text-neutral-disabled wby-cursor-not-allowed"
            }
        },
        defaultVariants: {
            weight: "strong"
        }
    }
);

interface LabelProps
    extends Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, "children">,
        VariantProps<typeof labelVariants> {
    text: React.ReactNode;
    value?: React.ReactNode;
    description?: React.ReactNode;
    hint?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
}

const LabelBase = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
    (
        { className, disabled, description, hint, required, value, text, weight, id, ...props },
        ref
    ) => {
        if (!text) {
            return null;
        }

        return (
            <LabelPrimitive.Root
                ref={ref}
                className={cn(labelVariants({ weight, disabled }), className)}
                htmlFor={id}
                {...props}
            >
                <span>
                    <span className={"wby-flex wby-items-center wby-gap-xxs"}>
                        {text}
                        {description && (
                            <LabelDescription content={description} disabled={disabled} />
                        )}
                        {hint && <LabelHint content={hint} />}
                        {required && <LabelRequired disabled={disabled} />}
                    </span>
                </span>
                {value && <LabelValue value={value} weight={weight} disabled={disabled} />}
            </LabelPrimitive.Root>
        );
    }
);
LabelBase.displayName = LabelPrimitive.Root.displayName;

const Label = makeDecoratable("Label", LabelBase);

export { Label, type LabelProps };
