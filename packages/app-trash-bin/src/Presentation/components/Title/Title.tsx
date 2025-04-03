import React from "react";
import { Heading, Skeleton } from "@webiny/admin-ui";

export interface TitleProps {
    title?: string;
}

export const Title = ({ title }: TitleProps) => {
    return <Heading level={5}>{title || <Skeleton size={"lg"} />}</Heading>;
};
