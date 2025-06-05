import * as React from "react";
import { ReactComponent as HideImageIcon } from "@webiny/icons/hide_image.svg";
import { useFile } from "~/hooks/useFile";
import { Icon } from "@webiny/admin-ui";

export const TableItemDefaultRenderer = () => {
    const { file } = useFile();

    return (
        <div className={"wby-w-full wby-h-full wby-flex wby-items-center wby-justify-center"}>
            <Icon color={"neutral-light"} size={"md"} icon={<HideImageIcon />} label={file.name} />
        </div>
    );
};
