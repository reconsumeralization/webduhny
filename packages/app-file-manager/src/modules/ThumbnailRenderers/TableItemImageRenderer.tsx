import * as React from "react";
import { Image } from "@webiny/app/components";
import { useFile } from "~/hooks/useFile";

const width100 = { width: 100 };

export const TableItemImageRenderer = () => {
    const { file } = useFile();
    return (
        <Image
            src={file.src}
            alt={file.name}
            transform={width100}
            className={"wby-object-cover wby-w-full wby-h-full"}
        />
    );
};
