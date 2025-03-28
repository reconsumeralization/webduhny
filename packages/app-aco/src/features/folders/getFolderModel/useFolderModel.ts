import React from "react";
import { FolderModelContext } from "./FolderModelContext";

export function useFolderModel() {
    const context = React.useContext(FolderModelContext);
    if (!context) {
        throw Error(`Missing "FolderModelContext" in the component tree!`);
    }

    return context;
}
