import React from "react";
import { useFile } from "~/hooks/useFile";
import { useFileManagerViewConfig } from "~/index";

export const CellThumbnail = () => {
    const { file } = useFile();
    const { browser, getThumbnailRenderer } = useFileManagerViewConfig();

    const renderer = getThumbnailRenderer(browser.table.cellThumbnails, file);

    return <>{renderer?.element || null}</>;
};
