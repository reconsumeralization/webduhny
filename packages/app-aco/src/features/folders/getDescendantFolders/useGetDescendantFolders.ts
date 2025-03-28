import { useCallback } from "react";
import { GetDescendantFolders } from "./GetDescendantFolders";
import { useFoldersType } from "~/hooks";

export const useGetDescendantFolders = () => {
    const type = useFoldersType();

    const getDescendantFolders = useCallback(
        (id: string) => {
            const instance = GetDescendantFolders.getInstance(type);
            return instance.execute({ id });
        },
        [type]
    );

    return {
        getDescendantFolders
    };
};
