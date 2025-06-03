import * as React from "react";
import { Image } from "@webiny/app/components";
import ImageIcon from "./assets/image.png";
import { useFile } from "~/hooks/useFile";

const width300 = { width: 300 };

export const DefaultRenderer = () => {
    const { file } = useFile();

    return (
        <Image
            src={ImageIcon}
            alt={file.name}
            transform={width300}
            className={"wby-w-full wby-object-cover"}
        />
    );
};
