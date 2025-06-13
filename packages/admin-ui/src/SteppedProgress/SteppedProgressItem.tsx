import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { type ProgressItemFormatted } from "./domains";
import { SteppedProgressIcon, SteppedProgressIndicator, SteppedProgressLabel } from "./components";

type SteppedProgressItemProps = React.HTMLAttributes<HTMLDivElement> & ProgressItemFormatted;

const DecoratableSteppedProgressItem = ({
    label,
    state,
    errored,
    disabled,
    className,
    ...props
}: SteppedProgressItemProps) => {
    return (
        <div
            {...props}
            className={cn(
                "wby-flex wby-justify-start wby-items-center wby-gap-sm-extra wby-py-sm",
                className
            )}
        >
            <SteppedProgressIndicator state={state} errored={errored} disabled={disabled}>
                <SteppedProgressIcon state={state} errored={errored} disabled={disabled} />
            </SteppedProgressIndicator>
            <SteppedProgressLabel state={state} disabled={disabled} label={label} />
        </div>
    );
};

const SteppedProgressItem = makeDecoratable("SteppedProgressItem", DecoratableSteppedProgressItem);

export { SteppedProgressItem, type SteppedProgressItemProps };
