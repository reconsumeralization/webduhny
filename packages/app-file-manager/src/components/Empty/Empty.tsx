import React from "react";
import { FilesRenderChildren } from "react-butterfiles";

import { useFileManagerApi } from "~/index";
import { NoPermissions } from "~/components/NoPermissions";
import { NoResults } from "~/components/NoResults";
import { FileDropArea } from "~/components/FileDropArea";

interface EmptyViewProps {
    browseFiles: FilesRenderChildren["browseFiles"];
    isSearchResult?: boolean;
}

export const Empty = ({ browseFiles, isSearchResult }: EmptyViewProps) => {
    const { canRead } = useFileManagerApi();

    if (!canRead) {
        return <NoPermissions />;
    }

    if (isSearchResult) {
        return <NoResults />;
    }

    return <FileDropArea empty onClick={() => browseFiles()} />;
};
