import React from "react";
import { ReactComponent as CopyContentIcon } from "@webiny/icons/content_copy.svg";
import { useCopyFile } from "~/hooks/useCopyFile";
import { FileManagerViewConfig, useFile } from "~/index";

const { FileDetails } = FileManagerViewConfig;

export const CopyUrl = () => {
    const { file } = useFile();
    const { copyFileUrl } = useCopyFile({ file });

    return (
        <FileDetails.Action.IconButton
            label={"Copy URL"}
            onAction={copyFileUrl}
            icon={<CopyContentIcon />}
        />
    );
};
