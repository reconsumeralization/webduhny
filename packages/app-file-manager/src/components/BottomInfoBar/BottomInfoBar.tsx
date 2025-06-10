import React from "react";
import mime from "mime/lite";
import { Separator } from "@webiny/admin-ui";

import SupportedFileTypes, { SupportedFileTypesProps } from "./SupportedFileTypes";
import ListStatus, { ListStatusProps } from "./ListStatus";

mime.define({ "image/x-icon": ["ico"] }, true);
mime.define({ "image/jpg": ["jpg"] }, true);
mime.define({ "image/vnd.microsoft.icon": ["ico"] }, true);

type BottomInfoBarProps = SupportedFileTypesProps & ListStatusProps;

export const BottomInfoBar = (props: BottomInfoBarProps) => {
    return (
        <div className="wby-bg-neutral-base wby-w-full wby-overflow-hidden wby-z-5">
            <Separator />
            <div
                className={
                    "wby-h-xl wby-px-md wby-py-sm wby-flex wby-items-center wby-justify-between"
                }
            >
                <SupportedFileTypes {...props} />
                <ListStatus {...props} />
            </div>
        </div>
    );
};
