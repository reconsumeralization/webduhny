import React from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { FileManagerViewConfig, useFile, useFileDetails, useFileManagerApi } from "~/index";
import { useDeleteFile } from "~/hooks/useDeleteFile";

const { FileDetails } = FileManagerViewConfig;

export const DeleteImage = () => {
    const { file } = useFile();
    const { canEdit } = useFileManagerApi();
    const { close } = useFileDetails();
    const { openDialogDeleteFile } = useDeleteFile({
        file,
        onDelete: close
    });

    if (!canEdit(file)) {
        return null;
    }

    return (
        <FileDetails.Action.Button
            label={"Delete"}
            onAction={openDialogDeleteFile}
            icon={<DeleteIcon />}
            data-testid={"fm-delete-file-button"}
        />
    );
};
