import { useCallback } from "react";
import { useFoldersType } from "~/hooks";
import { useFolderModel } from "~/features";
import { GetFolderExtensionsFields } from "./GetFolderExtensionsFields";

export const useGetFolderExtensionsFields = () => {
    const [type, modelId] = useFoldersType().split(":");
    const model = useFolderModel();

    const getFolderExtensionsFields = useCallback(() => {
        console.log("================================");
        console.log("model", model);
        console.log("getFolderExtensionsFields called", type, modelId);

        const instance = GetFolderExtensionsFields.getInstance(model, type, modelId);
        return instance.execute();
    }, [type, modelId, model.id]);

    return {
        getFolderExtensionsFields
    };
};
