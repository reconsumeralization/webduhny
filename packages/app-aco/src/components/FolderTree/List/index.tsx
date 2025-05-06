import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    DropOptions,
    getBackendOptions,
    InitialOpen,
    MultiBackend,
    NodeModel,
    Tree
} from "@minoru/react-dnd-treeview";
import { useSnackbar } from "@webiny/app-admin";
import { DndProvider } from "react-dnd";
import { Node } from "../Node";
import { NodePreview } from "../NodePreview";
import { Placeholder } from "../Placeholder";
import { createInitialOpenList, createTreeData } from "./utils";
import {
    useGetFolderHierarchy,
    useGetFolderLevelPermission,
    useListFoldersByParentIds,
    useUpdateFolder
} from "~/features";
import { ROOT_FOLDER } from "~/constants";
import { DndFolderItemData, FolderItem } from "~/types";
import { FolderProvider } from "~/contexts/folder";

interface ListProps {
    folders: FolderItem[];
    focusedFolderId?: string;
    hiddenFolderIds?: string[];
    enableActions?: boolean;
    onFolderClick: (data: FolderItem) => void;
}

export const List = ({
    folders,
    onFolderClick,
    focusedFolderId,
    hiddenFolderIds,
    enableActions
}: ListProps) => {
    const { updateFolder } = useUpdateFolder();
    const { getFolderLevelPermission: canManageStructure } =
        useGetFolderLevelPermission("canManageStructure");
    const { listFoldersByParentIds } = useListFoldersByParentIds();
    const { loading } = useGetFolderHierarchy();

    const { showSnackbar } = useSnackbar();
    const [treeData, setTreeData] = useState<NodeModel<DndFolderItemData>[]>([]);
    const [initialOpenList, setInitialOpenList] = useState<undefined | InitialOpen>();
    const [openFolderIds, setOpenFolderIds] = useState<string[]>([ROOT_FOLDER]);

    useEffect(() => {
        if (folders) {
            setTreeData(createTreeData(folders, focusedFolderId, hiddenFolderIds));
        }
    }, [folders, focusedFolderId]);

    useEffect(() => {
        if (!folders) {
            return;
        }
        setInitialOpenList(createInitialOpenList(folders, openFolderIds, focusedFolderId));
    }, [focusedFolderId]);

    const handleDrop = async (
        newTree: NodeModel<DndFolderItemData>[],
        { dragSourceId, dropTargetId }: DropOptions
    ) => {
        // Store the current state of the tree before the drop action
        const oldTree = [...treeData];
        try {
            const item = folders.find(folder => folder.id === dragSourceId);

            if (!item) {
                throw new Error("Folder not found!");
            }

            setTreeData(newTree);

            await updateFolder({
                ...item,
                parentId: dropTargetId !== ROOT_FOLDER ? (dropTargetId as string) : null
            });
        } catch (error) {
            // If an error occurred, revert the tree back to its previous state
            setTreeData(oldTree);
            return showSnackbar(error.message);
        }
    };

    const sort = useMemo(
        () => (a: NodeModel<DndFolderItemData>, b: NodeModel<DndFolderItemData>) => {
            if (a.id === ROOT_FOLDER || b.id === ROOT_FOLDER) {
                return 1;
            }
            return a.text.localeCompare(b.text, undefined, { numeric: true });
        },
        []
    );

    const handleChangeOpen = async (folderIds: string[]) => {
        setOpenFolderIds([ROOT_FOLDER, ...folderIds]);
        const removedListParentIds = new Set([ROOT_FOLDER, "0"]);
        const filteredFolderIds = folderIds.filter(item => !removedListParentIds.has(item));
        await listFoldersByParentIds(filteredFolderIds);
    };

    const canDrag = useCallback(
        (folderId: string) => {
            const isRootFolder = folderId === ROOT_FOLDER;
            return !isRootFolder && canManageStructure(folderId);
        },
        [canManageStructure]
    );

    return (
        <>
            <DndProvider backend={MultiBackend} options={getBackendOptions()} context={window}>
                <Tree
                    tree={treeData}
                    rootId={"0"}
                    onDrop={handleDrop}
                    onChangeOpen={ids => handleChangeOpen(ids as string[])}
                    sort={sort}
                    canDrag={item => canDrag(item!.id as string)}
                    render={(node, { depth, isOpen, onToggle }) => {
                        const folder = folders.find(folder => folder.id === node.id);
                        const isLoading = folder && loading[folder.id];
                        return (
                            <FolderProvider folder={folder}>
                                {isLoading}
                                <Node
                                    node={node}
                                    depth={depth}
                                    isOpen={isOpen}
                                    isLoading={isLoading}
                                    enableActions={enableActions}
                                    onToggle={onToggle}
                                    onClick={data => onFolderClick(data)}
                                />
                            </FolderProvider>
                        );
                    }}
                    dragPreviewRender={monitorProps => <NodePreview monitorProps={monitorProps} />}
                    classes={{
                        dropTarget: "dropTarget",
                        draggingSource: "draggingSource",
                        placeholder: "placeholderContainer"
                    }}
                    initialOpen={initialOpenList}
                    placeholderRender={(_, { depth }) => <Placeholder depth={depth} />}
                />
            </DndProvider>
        </>
    );
};
