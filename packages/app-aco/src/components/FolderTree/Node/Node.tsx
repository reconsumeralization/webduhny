import React, { useMemo } from "react";
import { ReactComponent as Folder } from "@webiny/icons/folder.svg";
import { ReactComponent as FolderShared } from "@webiny/icons/folder_shared.svg";
import { ReactComponent as HomeIcon } from "@webiny/icons/home.svg";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { MenuActions } from "../MenuActions";
import { DndFolderItemData, FolderItem } from "~/types";
import { parseIdentifier } from "@webiny/utils";
import { ROOT_FOLDER } from "~/constants";
import { useFolder } from "~/hooks";
import { cn, Text } from "@webiny/admin-ui";
import { TreeItemCollapsibleTrigger } from "./components/TreeItemCollapsibleTrigger";
import { TreeItem } from "./components/TreeItem";
import { TreeItemIcon } from "./components/TreeItemIcon";
import { TreeItemContent } from "./components/TreeItemContent";

type NodeProps = {
    node: NodeModel<DndFolderItemData>;
    depth: number;
    isOpen: boolean;
    enableActions?: boolean;
    onToggle: (id: string | number) => void;
    onClick: (data: FolderItem) => void;
};

interface FolderProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    isRoot: boolean;
    hasNonInheritedPermissions?: boolean;
    canManagePermissions?: boolean;
}

export const FolderNode = ({
    isRoot,
    hasNonInheritedPermissions,
    canManagePermissions,
    text,
    className,
    ...props
}: FolderProps) => {
    let icon = <HomeIcon />;

    if (!isRoot) {
        if (hasNonInheritedPermissions && canManagePermissions) {
            icon = <FolderShared />;
        } else {
            icon = <Folder />;
        }
    }

    return (
        <div
            {...props}
            className={cn("wby-flex wby-items-center wby-w-full wby-gap-sm wby-pr-xxl", className)}
        >
            <TreeItemIcon label={"Folder"} element={icon} />
            <Text as={"div"} className={"wby-truncate"}>
                {text}
            </Text>
        </div>
    );
};

export const Node = ({ node, depth, isOpen, enableActions, onToggle, onClick }: NodeProps) => {
    const { folder } = useFolder();
    const isRoot = folder.id === ROOT_FOLDER;
    // Move the placeholder line to the left based on the element depth within the tree.
    // Let's add some pixels so that the element is detached from the container but takes up the whole length while it's highlighted during dnd.
    const indent = depth === 1 ? 8 : (depth - 1) * 20 + 8;

    const dragOverProps = useDragOver(folder.id, isOpen, onToggle);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle(folder.id);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick(folder);
        if (folder.id !== ROOT_FOLDER) {
            onToggle(folder.id);
        }
    };

    const id = useMemo(() => {
        const { id } = parseIdentifier(String(folder.id));
        return id;
    }, [folder.id]);

    const { hasNonInheritedPermissions, canManagePermissions } = folder || {};

    return (
        <TreeItem
            active={!!node.data?.isFocused}
            style={{ paddingInlineStart: indent }}
            {...dragOverProps}
        >
            {isRoot ? null : <TreeItemCollapsibleTrigger open={isOpen} onClick={handleToggle} />}
            <TreeItemContent onClick={handleClick} className={`aco-folder-${id}`}>
                <FolderNode
                    isRoot={isRoot}
                    text={node.text}
                    hasNonInheritedPermissions={hasNonInheritedPermissions}
                    canManagePermissions={canManagePermissions}
                />
            </TreeItemContent>
            {enableActions && !isRoot && <MenuActions />}
        </TreeItem>
    );
};
