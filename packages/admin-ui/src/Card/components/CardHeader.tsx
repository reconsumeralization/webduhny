import React from "react";
import { Heading } from "~/Heading";
import { Text } from "~/Text";
import { CardProps } from "~/Card";

type CardHeaderProps = Pick<CardProps, "title" | "description" | "options">;

const CardHeader = ({ title, description, options }: CardHeaderProps) => {
    if (!title && !description && !options) {
        return null;
    }

    return (
        <div className={"wby-flex wby-flex-row wby-justify-between"}>
            <div className={"wby-flex wby-flex-col wby-gap-y-xs"}>
                {typeof title === "string" ? (
                    <Heading level={6} as={"h1"}>
                        {title}
                    </Heading>
                ) : (
                    title
                )}
                {typeof description === "string" ? (
                    <Text size="sm" className={"wby-text-neutral-strong"}>
                        {description}
                    </Text>
                ) : (
                    description
                )}
            </div>
            <div>{options}</div>
        </div>
    );
};

export { CardHeader, type CardHeaderProps };
