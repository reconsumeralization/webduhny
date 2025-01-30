import { useContext } from "react";

import { FoldersContext } from "~/contexts/folders";

export const useFoldersType = () => {
    const foldersContext = useContext(FoldersContext);

    if (!foldersContext) {
        throw new Error("useFoldersType must be used within a FoldersProvider!");
    }

    const { type } = foldersContext;

    if (!type) {
        throw Error(`FoldersProvider requires a "type" prop or an AcoAppContext to be available!`);
    }

    return type;
};
