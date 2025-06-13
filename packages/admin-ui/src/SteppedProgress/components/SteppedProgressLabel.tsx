import React from "react";
import { Text } from "~/Text";
import { cn } from "~/utils";
import { ProgressItemState } from "~/SteppedProgress/domains";

interface SteppedProgressLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
    state: ProgressItemState;
    disabled: boolean;
}

const SteppedProgressLabel = ({
    label,
    state,
    disabled,
    className,
    ...props
}: SteppedProgressLabelProps) => {
    return (
        <Text
            {...props}
            className={cn(
                state === ProgressItemState.IN_PROGRESS ? "wby-font-semibold" : "wby-font-regular",
                disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-primary",
                className
            )}
        >
            {label}
        </Text>
    );
};

export { SteppedProgressLabel, type SteppedProgressLabelProps };
