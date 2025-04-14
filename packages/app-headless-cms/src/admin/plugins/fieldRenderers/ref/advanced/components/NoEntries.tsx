import React from "react";
import { Text } from "@webiny/admin-ui";

interface NoEntriesProps {
    text?: React.ReactNode;
}

const NoEntries = ({ text = "No records found." }: NoEntriesProps) => {
    return (
        <div
            className={
                "wby-flex wby-justify-center wby-px-xl wby-py-md-extra wby-bg-neutral-subtle"
            }
        >
            <Text size={"sm"}>{text}</Text>
        </div>
    );
};

export { NoEntries, type NoEntriesProps };
