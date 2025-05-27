import React from "react";
import { CardProps } from "~/Card";

type CardFooterProps = Pick<CardProps, "actions">;

const CardFooter = ({ actions }: CardFooterProps) => {
    if (!actions) {
        return null;
    }

    return <div className={"wby-flex wby-justify-end wby-gap-sm"}>{actions}</div>;
};

export { CardFooter, type CardFooterProps };
