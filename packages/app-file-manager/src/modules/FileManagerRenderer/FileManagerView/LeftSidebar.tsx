import React from "react";
import { Separator } from "@webiny/admin-ui";
import { FolderTree } from "@webiny/app-aco";

interface LeftSidebarProps {
    currentFolder?: string;
    onFolderClick: (folderId: string) => void;
    children?: React.ReactNode;
}

export const LeftSidebar = ({ currentFolder, onFolderClick, children }: LeftSidebarProps) => {
    return (
        <div className={"wby-p-xs"}>
            <FolderTree
                focusedFolderId={currentFolder}
                onFolderClick={data => onFolderClick(data.id)}
                enableActions={true}
                enableCreate={true}
            />
            {children ? <Separator /> : null}
            {children}
        </div>
    );
};
