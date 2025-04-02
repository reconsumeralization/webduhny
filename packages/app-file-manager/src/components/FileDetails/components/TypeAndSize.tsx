import React, { useMemo } from "react";
import bytes from "bytes";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as ImageIcon } from "@webiny/icons/insert_photo.svg";
import { ReactComponent as FileIcon } from "@webiny/icons/insert_drive_file.svg";
import { useFile } from "~/hooks/useFile";

export const TypeAndSize = () => {
    const { file } = useFile();

    const fileTypeIcon = useMemo(() => {
        if (file && typeof file.type === "string") {
            return file.type.includes("image") ? <ImageIcon /> : <FileIcon />;
        }
        return <ImageIcon />;
    }, [file]);

    return (
        <div className={"wby-flex wby-items-center wby-gap-xs"}>
            <div>
                <Icon icon={fileTypeIcon} label={"File icon"} color={"neutral-light"} />
            </div>
            <div>
                <Text size={"sm"}>{file.type}</Text>
                <span>&nbsp;-&nbsp;</span>
                <Text size={"sm"}>
                    {bytes.format(file.size, {
                        unitSeparator: " "
                    })}
                </Text>
            </div>
        </div>
    );
};
