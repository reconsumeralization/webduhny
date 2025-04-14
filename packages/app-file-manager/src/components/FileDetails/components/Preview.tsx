import React from "react";
import { Thumbnail } from "./Thumbnail";
import { cn } from "@webiny/admin-ui";

export const Preview = () => {
    return (
        <div
            className={cn(
                "wby-h-full wby-w-auto wby-flex wby-items-center wby-justify-center",
                "wby-bg-[repeating-conic-gradient(theme(backgroundColor.neutral.dimmed)_0%_25%,transparent_0%_50%)]",
                "wby-bg-[length:24px_24px] wby-bg-center",
                "[&_*]:wby-max-w-[400px] [&_*]:wby-max-h-[calc(100vh-274px)]"
            )}
        >
            <Thumbnail />
        </div>
    );
};
