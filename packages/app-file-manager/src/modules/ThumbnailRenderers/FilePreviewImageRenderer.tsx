import * as React from "react";
import { Image } from "@webiny/app/components";
import { useFile } from "~/hooks/useFile";

const width750 = { width: 750 };

export const FilePreviewImageRenderer = () => {
    const { file } = useFile();
    return (
        <Image
            src={file.src}
            alt={file.name}
            transform={width750}
            className={"wby-object-contain wby-max-w-full wby-max-h-full"}
        />
    );
};
