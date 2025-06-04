import * as React from "react";
import {
    ProgressIndicator,
    ProgressRoot,
    type ProgressRootProps,
    ProgressValue
} from "./components";
import { useProgressBar } from "./useProgressBar";
import { cn } from "~/utils";

interface ProgressBarProps extends ProgressRootProps {
    valuePosition?: "start" | "end" | "both";
}

function ProgressBar({ valuePosition, className, ...props }: ProgressBarProps) {
    const { vm } = useProgressBar(props);

    return (
        <div className={cn("wby-w-full wby-flex wby-items-center wby-gap-sm wby-py-xs", className)}>
            {valuePosition && valuePosition !== "end" && (
                <ProgressValue value={valuePosition === "start" ? vm.textValue : vm.textMin} />
            )}
            <ProgressRoot {...props}>
                <ProgressIndicator value={vm.value} />
            </ProgressRoot>
            {valuePosition && valuePosition !== "start" && <ProgressValue value={vm.textValue} />}
        </div>
    );
}

export { ProgressBar, type ProgressBarProps };
