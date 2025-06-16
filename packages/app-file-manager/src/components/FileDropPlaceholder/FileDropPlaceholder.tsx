import React from "react";
import { FileDropArea } from "../FileDropArea";

export const FileDropPlaceholder = () => {
    return (
        <div
            className={
                "wby-absolute wby-top-0 wby-left-0 wby-bottom-0 wby-right-0 wby-animate-in wby-fade-in wby-duration-300"
            }
        >
            <FileDropArea
                title={"Drop files here"}
                description={"Upload files from your computer by dropping them here"}
            />
        </div>
    );
};
