import React, { useCallback } from "react";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { FileManagerViewConfig, useFile, useFileManagerView } from "~/index";

const { Browser } = FileManagerViewConfig;

export const Settings = () => {
    const { file } = useFile();
    const view = useFileManagerView();

    const showDetails = useCallback(() => {
        view.showFileDetails(file.id);
    }, [file.id]);

    return (
        <Browser.Grid.Item.Action.IconButton
            icon={<SettingsIcon />}
            onAction={showDetails}
            data-testid={"fm-file-wrapper-file-info-icon"}
        />
    );
};
