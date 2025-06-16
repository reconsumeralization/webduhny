import * as React from "react";
import { Image } from "@webiny/app/components";
import { useFile } from "~/hooks/useFile";

const width300 = { width: 300 };

export const GridItemImageRenderer = () => {
    const { file } = useFile();
    return (
        <Image
            src={file.src}
            alt={file.name}
            transform={width300}
            className={"wby-object-contain wby-max-w-full wby-max-h-full"}
        />
    );
};
