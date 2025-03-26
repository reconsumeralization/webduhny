import React, { useMemo } from "react";
import { ReactComponent as ArrowRight } from "@webiny/icons/chevron_right.svg";
import { ReactComponent as Folder } from "@webiny/icons/folder.svg";
import { ReactComponent as FolderShared } from "@webiny/icons/folder_shared.svg";
import { ReactComponent as HomeIcon } from "@webiny/icons/home.svg";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { MenuActions } from "../MenuActions";
import { Container, ArrowIcon, FolderIcon, Content } from "./styled";
import { DndFolderItemData, FolderItem } from "~/types";
import { parseIdentifier } from "@webiny/utils";
import { ROOT_FOLDER } from "~/constants";
import { useFolder } from "~/hooks";
import { cn, Icon, Text } from "@webiny/admin-ui";

type NodeProps = {
    node: NodeModel<DndFolderItemData>;
    depth: number;
    isOpen: boolean;
    enableActions?: boolean;
    onToggle: (id: string | number) => void;
    onClick: (data: FolderItem) => void;
};

type FolderProps = {
    text: string;
    isRoot: boolean;
    isOpen: boolean;
    isFocused?: boolean;
    hasNonInheritedPermissions?: boolean;
    canManagePermissions?: boolean;
};

export const FolderNode = ({
    isRoot,
    isFocused,
    hasNonInheritedPermissions,
    canManagePermissions,
    text
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
            className={cn([
                "wby-flex wby-items-center wby-gap-sm",
                "wby-text-neutral-primary",
                isFocused && "wby-font-semibold wby-bg-neutral-dark/5"
            ])}
        >
            <Icon
                icon={icon}
                size="sm"
                label={"Folder"}
                color={"neutral-light"}
                className={cn("wby-whitespace-nowrap wby-overflow-hidden wby-text-ellipsis")}
            />
            <Text className={isFocused ? "focused" : ""}>{text}</Text>
        </div>
    );
};

export const Node = ({ node, depth, isOpen, enableActions, onToggle, onClick }: NodeProps) => {
    const { folder } = useFolder();
    const isRoot = folder.id === ROOT_FOLDER;
    // Move the placeholder line to the left based on the element depth within the tree.
    // Let's add some pixels so that the element is detached from the container but takes up the whole length while it's highlighted during dnd.
    const indent = depth === 1 ? 4 : (depth - 1) * 20 + 8;

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
        <Container
            isFocused={!!node.data?.isFocused}
            style={{ paddingInlineStart: indent }}
            {...dragOverProps}
        >
            {isRoot ? null : (
                <div onClick={handleToggle} className={cn("wby-cursor-pointer")}>
                    <Icon
                        icon={<ArrowRight />}
                        size="sm"
                        label={"Open / Close folder"}
                        color={"neutral-strong"}
                        className={cn(
                            "wby-transition wby-transform wby-duration-100 wby-ease-linear",
                            isOpen ? "wby-rotate-90" : "wby-rotate-0"
                        )}
                    />
                </div>
            )}
            <Content onClick={handleClick} className={`aco-folder-${id}`}>
                <FolderNode
                    isRoot={isRoot}
                    text={node.text}
                    hasNonInheritedPermissions={hasNonInheritedPermissions}
                    canManagePermissions={canManagePermissions}
                    isOpen={isRoot ? true : isOpen}
                    isFocused={!!node.data?.isFocused}
                />
            </Content>
            {enableActions && !isRoot && <MenuActions />}
        </Container>
    );
};
