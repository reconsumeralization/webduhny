import React from "react";
import { FolderTree, useNavigateFolder } from "@webiny/app-aco";

export const SidebarContent = () => {
    const { navigateToFolder, currentFolderId } = useNavigateFolder();

    return (
        <div className={"wby-p-xs wby-flex-1 wby-overflow-y-scroll"}>
            <FolderTree
                focusedFolderId={currentFolderId}
                onFolderClick={data => navigateToFolder(data.id)}
                enableActions={true}
                enableCreate={true}
            />
        </div>
    );
};
