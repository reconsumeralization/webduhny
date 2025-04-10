import React from "react";
import { cn, Text } from "@webiny/admin-ui";

interface GroupOperationLabelProps {
    operation: string;
    show: boolean;
}
export const GroupOperationLabel = ({ operation, show }: GroupOperationLabelProps) => {
    if (!show) {
        return null;
    }

    return (
        <span
            className={cn([
                "wby-bg-neutral-base wby-rounded-xxl wby-px-md wby-py-xs",
                "wby-w-[56px] wby-h-[28px]",
                "wby-absolute -wby-bottom-[15px] wby-left-1/2 -wby-ml-[46px] wby-z-50"
            ])}
        >
            <Text size={"sm"}>{operation}</Text>
        </span>
    );
};
