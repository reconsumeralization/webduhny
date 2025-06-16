import React, { useEffect } from "react";
import { Separator } from "@webiny/admin-ui";
import { FolderTree, useGetFolderHierarchy } from "@webiny/app-aco";

interface LeftSidebarProps {
    currentFolder: string;
    onFolderClick: (folderId: string) => void;
    children?: React.ReactNode;
}

export const LeftSidebar = ({ currentFolder, onFolderClick, children }: LeftSidebarProps) => {
    const { folders, getFolderHierarchy } = useGetFolderHierarchy();

    useEffect(() => {
        if (folders.length > 0) {
            return; // Skip if we already have folders in the cache.
        }

        getFolderHierarchy(currentFolder);
    }, [currentFolder]);

    return (
        <div className={"wby-p-xs wby-overflow-auto"} style={{ height: "calc(100vh - 69px)" }}>
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
