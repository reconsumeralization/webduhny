import React from "react";
import { ReactComponent as CheckIcon } from "@webiny/icons/check.svg";
import { ReactComponent as ErrorIcon } from "@webiny/icons/error_outline.svg";
import { cn, cva, type VariantProps } from "~/utils";
import { ProgressItemState } from "~/SteppedProgress/domains";
import { Icon } from "~/Icon";

const steppedProgressIconVariants = cva(
    ["wby-absolute wby-top-1/2 wby-left-1/2 -wby-translate-x-1/2 -wby-translate-y-1/2"],
    {
        variants: {
            state: {
                [ProgressItemState.IDLE]: "wby-hidden",
                [ProgressItemState.IN_PROGRESS]:
                    "wby-size-sm-extra wby-rounded-full wby-bg-primary-default",
                [ProgressItemState.COMPLETED]: "wby-fill-neutral-base",
                [ProgressItemState.COMPLETED_AFFIRMATIVE]: "wby-fill-neutral-base"
            },
            disabled: {
                true: "!wby-fill-neutral-base"
            },
            errored: {
                true: "wby-fill-destructive"
            }
        },
        compoundVariants: [
            // disabled
            {
                state: ProgressItemState.IN_PROGRESS,
                disabled: true,
                className: "wby-bg-neutral-strong"
            },
            // errored
            {
                state: ProgressItemState.IDLE,
                errored: true,
                className: "wby-block"
            },
            {
                state: ProgressItemState.IN_PROGRESS,
                errored: true,
                className: "wby-size-auto wby-rounded-none wby-bg-transparent"
            },
            {
                state: ProgressItemState.COMPLETED,
                errored: true,
                className: "wby-fill-neutral-base"
            },
            {
                state: ProgressItemState.COMPLETED_AFFIRMATIVE,
                errored: true,
                className: "wby-fill-neutral-base"
            }
        ],
        defaultVariants: {
            state: ProgressItemState.IDLE
        }
    }
);

interface SteppedProgressIconProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof steppedProgressIconVariants> {}

const SteppedProgressIcon = ({
    state,
    errored,
    disabled,
    className,
    ...props
}: SteppedProgressIconProps) => {
    const icon = React.useMemo(() => {
        if (errored) {
            return <Icon icon={<ErrorIcon />} label={"Error"} size={"sm"} />;
        }

        if (
            state === ProgressItemState.COMPLETED ||
            state === ProgressItemState.COMPLETED_AFFIRMATIVE
        ) {
            return <Icon icon={<CheckIcon />} label={"Completed"} size={"sm"} />;
        }

        return <></>;
    }, [state, errored]);

    return (
        <div
            {...props}
            className={cn(steppedProgressIconVariants({ state, disabled, errored }), className)}
        >
            {icon}
        </div>
    );
};

export { SteppedProgressIcon, type SteppedProgressIconProps };
