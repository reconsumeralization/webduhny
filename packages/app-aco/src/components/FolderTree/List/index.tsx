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
    useGetFolderLevelPermission,
    useListFoldersByParentIds,
    useUpdateFolder
} from "~/features";
import { ROOT_FOLDER } from "~/constants";
import { DndFolderItemData, FolderItem } from "~/types";
import { FolderProvider } from "~/contexts/folder";
import { useAcoConfig } from "~/config";
import { useConfirmMoveFolderDialog } from "~/dialogs";

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
    const { listFoldersByParentIds, getIsFolderLoading } = useListFoldersByParentIds();
    const { showSnackbar } = useSnackbar();
    const [treeData, setTreeData] = useState<NodeModel<DndFolderItemData>[]>([]);
    const [initialOpenList, setInitialOpenList] = useState<undefined | InitialOpen>();
    const [openFolderIds, setOpenFolderIds] = useState<string[]>([ROOT_FOLDER]);
    const { showDialog: showConfirmMoveFolderDialog } = useConfirmMoveFolderDialog();
    const { folder: folderConfigs } = useAcoConfig();

    useEffect(() => {
        if (folders) {
            setTreeData(createTreeData(folders, focusedFolderId, hiddenFolderIds));
        }
    }, [folders, focusedFolderId, hiddenFolderIds]);

    const memoCreateInitialOpenList = useCallback(
        (focusedFolderId?: string) => {
            return createInitialOpenList(folders, openFolderIds, focusedFolderId);
        },
        [folders, openFolderIds]
    );

    useEffect(() => {
        setInitialOpenList(memoCreateInitialOpenList(focusedFolderId));
    }, [focusedFolderId]);

    const onDrop = useCallback(
        async (newTree: NodeModel<DndFolderItemData>[], options: DropOptions) => {
            // Function to execute the drop logic
            const runDrop = () => handleDrop(newTree, options);

            // If drop confirmation is enabled, show dialog before proceeding
            if (folderConfigs.dropConfirmation) {
                const { dragSourceId, dropTargetId } = options;
                const folder = folders.find(f => f.id === dragSourceId);
                const targetFolder = folders.find(f => f.id === dropTargetId);

                // Abort if either folder is not found
                if (!folder || !targetFolder) {
                    return;
                }

                showConfirmMoveFolderDialog({
                    folder,
                    targetFolder,
                    onAccept: runDrop
                });
            } else {
                // Otherwise, perform the drop immediately
                await runDrop();
            }
        },
        [folders, folderConfigs.dropConfirmation, showConfirmMoveFolderDialog]
    );

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
        setOpenFolderIds([...new Set([ROOT_FOLDER, ...folderIds])]);
        const filteredFolderIds = folderIds.filter(item => item !== ROOT_FOLDER && item !== "0");
        await listFoldersByParentIds(filteredFolderIds);
    };

    const canDrag = useCallback(
        (folderId: string) => {
            const isRootFolder = folderId === ROOT_FOLDER;
            return !isRootFolder && canManageStructure(folderId);
        },
        [canManageStructure]
    );

    const renderNode = useCallback(
        (node: NodeModel<DndFolderItemData>, { depth, isOpen, onToggle }: any) => {
            const folder = folders.find(folder => folder.id === node.id);
            return (
                <FolderProvider folder={folder}>
                    <Node
                        node={node}
                        depth={depth}
                        isOpen={isOpen}
                        onToggle={onToggle}
                        isLoading={getIsFolderLoading(folder?.id)}
                        enableActions={enableActions}
                        onClick={onFolderClick}
                    />
                </FolderProvider>
            );
        },
        [folders, getIsFolderLoading, enableActions, onFolderClick]
    );

    return (
        <>
            <DndProvider backend={MultiBackend} options={getBackendOptions()} context={window}>
                <Tree
                    tree={treeData}
                    rootId={"0"}
                    onDrop={onDrop}
                    onChangeOpen={ids => handleChangeOpen(ids as string[])}
                    sort={sort}
                    canDrag={item => canDrag(item!.id as string)}
                    render={renderNode}
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
