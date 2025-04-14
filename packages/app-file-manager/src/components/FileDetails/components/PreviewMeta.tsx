import React from "react";
import { TypeAndSize } from "./TypeAndSize";
import { CreatedOn } from "./CreatedOn";

export const PreviewMeta = () => {
    return (
        <div className={"wby-flex wby-items-center wby-justify-between wby-p-sm"}>
            <TypeAndSize />
            <CreatedOn />
        </div>
    );
};
