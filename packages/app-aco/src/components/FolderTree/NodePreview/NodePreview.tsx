import React from "react";
import { FolderNode } from "../Node";
import { TreeItem } from "~/components/FolderTree/Node/components";

type NodePreviewProps = {
    text: string;
};

export const NodePreview = ({ text }: NodePreviewProps) => {
    return (
        <TreeItem
            className={"wby-bg-neutral-dark/10 wby-absolute wby-z-[100]"}
            style={{ maxWidth: 256 }}
        >
            <FolderNode text={text} isRoot={false} />
        </TreeItem>
    );
};
