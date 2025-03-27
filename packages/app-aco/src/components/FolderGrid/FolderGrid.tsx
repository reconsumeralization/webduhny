import React from "react";

import { FolderProvider } from "~/contexts/folder";
import { Folder } from "~/components/FolderGrid/Folder";
import { AcoWithConfig } from "~/config";
import { FolderItem } from "~/types";
import { Grid } from "@webiny/admin-ui";

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
            <Grid>
                {folders.map(folder => (
                    <Grid.Column span={3} key={folder.id}>
                        <FolderProvider folder={folder}>
                            <Folder onClick={onFolderClick} />
                        </FolderProvider>
                    </Grid.Column>
                ))}
            </Grid>
        </AcoWithConfig>
    );
};
