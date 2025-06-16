import React from "react";
import { Text } from "~/Text";

interface ProgressBarProps {
    value: string;
}

const ProgressValue = ({ value }: ProgressBarProps) => {
    return (
        <Text size={"sm"} className={"wby-leading-none wby-shrink-0"}>
            {value}
        </Text>
    );
};

export { ProgressValue, type ProgressBarProps };
