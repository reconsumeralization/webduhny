import React from "react";
import { cn, Text } from "@webiny/admin-ui";

interface ModelNameProps {
    name: string;
}

export const ModelName = ({ name }: ModelNameProps) => {
    return (
        <Text size="sm" as="div" className={cn("wby-truncate wby-w-full wby-text-neutral-muted")}>
            {name}
        </Text>
    );
};
