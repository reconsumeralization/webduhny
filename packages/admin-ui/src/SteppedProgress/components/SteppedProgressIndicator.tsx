import React from "react";
import { cn, cva, type VariantProps } from "~/utils";
import { ProgressItemState } from "~/SteppedProgress/domains";

const steppedProgressIndicatorVariants = cva(
    ["wby-size-lg wby-rounded-full wby-relative wby-shrink-0 wby-basis-auto"],
    {
        variants: {
            state: {
                [ProgressItemState.IDLE]:
                    "wby-bg-neutral-base wby-border-sm wby-border-solid wby-border-neutral-muted",
                [ProgressItemState.IN_PROGRESS]: [
                    "wby-bg-primary-base wby-border-sm wby-border-solid wby-border-neutral-muted"
                ],
                [ProgressItemState.COMPLETED]: "wby-bg-primary-default",
                [ProgressItemState.COMPLETED_AFFIRMATIVE]: "wby-bg-success-default"
            },
            disabled: {
                true: "!wby-bg-neutral-dimmed !wby-border-none"
            },
            errored: {
                true: ""
            }
        },
        compoundVariants: [
            {
                state: ProgressItemState.COMPLETED,
                errored: true,
                className: "wby-bg-destructive-default"
            }
        ],
        defaultVariants: {
            state: ProgressItemState.IDLE
        }
    }
);

interface SteppedProgressIndicatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof steppedProgressIndicatorVariants> {}

const SteppedProgressIndicator = ({
    state,
    disabled,
    errored,
    className,
    children,
    ...props
}: SteppedProgressIndicatorProps) => {
    return (
        <div
            {...props}
            className={cn(
                steppedProgressIndicatorVariants({ state, disabled, errored }),
                className
            )}
        >
            {children}
        </div>
    );
};

export { SteppedProgressIndicator, type SteppedProgressIndicatorProps };
