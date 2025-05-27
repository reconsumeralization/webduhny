import React from "react";
import { cn, Text } from "@webiny/admin-ui";

interface TitleProps {
    title: string;
}

export const Title = ({ title }: TitleProps) => {
    return (
        <Text
            size={"sm"}
            as={"div"}
            className={cn("wby-truncate wby-w-full wby-text-neutral-primary")}
        >
            {title}
        </Text>
    );
};
