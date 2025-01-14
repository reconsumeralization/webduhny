import React, { useState } from "react";
import { CmsModel } from "@webiny/app-headless-cms/types";
import { useQuery } from "@apollo/react-hooks";
import { GET_FILE_MODEL } from "~/modules/FileManagerApiProvider/graphql";

export const FileModelContext = React.createContext<CmsModel | undefined>(undefined);

export const FileModelProvider = ({ children }: { children: React.ReactNode }) => {
    const [model, setModel] = useState<CmsModel | undefined>(undefined);

    useQuery(GET_FILE_MODEL, {
        onCompleted: data => {
            setModel(data.fileManager.getFileModel.data);
        }
    });

    if (!model) {
        // Not showing circular progress here because:
        // 1. we want to avoid showing it for a very short period of time
        // 2. the theme is not yet loaded, so the circular progress would not be styled correctly
        return null;
    }

    return <FileModelContext.Provider value={model}>{children}</FileModelContext.Provider>;
};
