import React from "react";
import { FileDropArea } from "../FileDropArea";

export const FileDropPlaceholder = () => {
    return (
        <div className={"wby-absolute wby-top-0 wby-left-0 wby-bottom-0 wby-right-0"}>
            <FileDropArea />
        </div>
    );
};
