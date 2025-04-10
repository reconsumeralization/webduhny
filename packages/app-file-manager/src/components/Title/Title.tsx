import React from "react";

import { Skeleton } from "@webiny/ui/Skeleton";
import { Text } from "@webiny/admin-ui";

export interface TitleProps {
    title?: string;
}

export const Title = ({ title }: TitleProps) => {
    if (title) {
        return <Text className={"wby-font-semibold"}>{title}</Text>;
    }

    return <Skeleton size={"lg"} />;
};
