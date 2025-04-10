import React from "react";
import { ReactComponent as MoveFileIcon } from "@webiny/icons/drive_file_move.svg";
import { FileManagerViewConfig, useFile, useMoveFileToFolder } from "~/index";

const { FileDetails } = FileManagerViewConfig;

export const MoveToFolder = () => {
    const { file } = useFile();
    const moveToFolder = useMoveFileToFolder(file);

    return (
        <FileDetails.Action.IconButton
            label={"Move to Folder"}
            icon={<MoveFileIcon />}
            onAction={moveToFolder}
        />
    );
};
