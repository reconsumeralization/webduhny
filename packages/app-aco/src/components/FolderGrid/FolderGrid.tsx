import React from "react";

import { FolderProvider } from "~/contexts/folder";
import { Folder } from "~/components/FolderGrid/Folder";
import { AcoWithConfig } from "~/config";
import { FolderItem } from "~/types";

interface FolderGridProps {
    folders: FolderItem[];
    onFolderClick: (id: string) => void;
}

export const FolderGrid = ({ folders, onFolderClick }: FolderGridProps) => {
    if (folders.length === 0) {
        return null;
    }

    return (
        <AcoWithConfig>
            <div
                className={
                    "wby-w-full wby-grid wby-grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] wby-gap-md"
                }
            >
                {folders.map(folder => (
                    <FolderProvider folder={folder} key={folder.id}>
                        <Folder onClick={onFolderClick} />
                    </FolderProvider>
                ))}
            </div>
        </AcoWithConfig>
    );
};
