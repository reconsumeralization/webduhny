import React from "react";
import mime from "mime";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { FileItem } from "@webiny/app-admin/types";
import { FileManagerViewConfig, useFile, useFileDetails, useFileManagerApi } from "~/index";
import { useDeleteFile } from "~/hooks/useDeleteFile";

const { FileDetails } = FileManagerViewConfig;

const isImage = (file: FileItem) => {
    const fileType = mime.getType(file && file.name);

    if (fileType) {
        return fileType.includes("image");
    }

    return false;
};

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
        <FileDetails.Action.IconButton
            label={isImage(file) ? "Delete image" : "Delete file"}
            onAction={openDialogDeleteFile}
            icon={<DeleteIcon />}
            data-testid={"fm-delete-file-button"}
        />
    );
};
