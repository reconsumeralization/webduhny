import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { FolderNode } from "../Node";
import { DndFolderItemData } from "~/types";
import { TreeItem } from "~/components/FolderTree/Node/components";

type NodePreviewProps = {
    monitorProps: DragLayerMonitorProps<DndFolderItemData>;
};

export const NodePreview = (props: NodePreviewProps) => {
    const item = props.monitorProps.item;

    return (
        <TreeItem
            className={"wby-overflow-hidden wby-bg-neutral-dark/10"}
            style={{ maxWidth: 256 }}
        >
            <FolderNode text={item.text} isRoot={false} {...props} />
        </TreeItem>
    );
};
