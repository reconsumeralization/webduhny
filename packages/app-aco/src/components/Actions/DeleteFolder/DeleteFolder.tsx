import React, { useCallback } from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";

import { AcoConfig } from "~/config";
import { useDeleteDialog } from "~/dialogs";
import { useFolder } from "~/hooks";

export const DeleteFolder = () => {
    const { folder } = useFolder();
    const { showDialog } = useDeleteDialog();
    const { OptionsMenuItem } = AcoConfig.Folder.Action;

    const onAction = useCallback(() => {
        showDialog({
            folder
        });
    }, [folder]);

    if (!folder) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<DeleteIcon />}
            label={"Delete"}
            onAction={onAction}
            data-testid={"aco.actions.folder.delete"}
            className={"!wby-text-destructive-primary [&_svg]:wby-fill-destructive"}
        />
    );
};
