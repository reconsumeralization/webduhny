import React from "react";
import { Thumbnail } from "./Thumbnail";
import { cn } from "@webiny/admin-ui";

export const Preview = () => {
    return (
        <div className={"wby-h-full wby-w-full"}>
            <div
                className={cn([
                    "wby-flex wby-items-center wby-justify-center",
                    "wby-w-full wby-aspect-square wby-rounded-lg wby-bg-neutral-dimmed",
                    "wby-overflow-hidden"
                ])}
            >
                <Thumbnail />
            </div>
        </div>
    );
};
