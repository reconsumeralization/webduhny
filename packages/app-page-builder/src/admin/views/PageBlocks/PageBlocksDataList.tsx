import React, { useCallback, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { ReactComponent as ExportIcon } from "@webiny/icons/file_download.svg";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { ReactComponent as CloneIcon } from "@webiny/icons/copy_all.svg";
import { ReactComponent as TableIcon } from "@webiny/icons/table_chart.svg";
import { IconButton, OverlayLoader, Tooltip } from "@webiny/admin-ui";
import { useRouter } from "@webiny/react-router";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { i18n } from "@webiny/app/i18n";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import useExportBlockDialog from "~/editor/plugins/defaultBar/components/ExportBlockButton/useExportBlockDialog";
import { PbPageBlock } from "~/types";
import { CreatableItem } from "./PageBlocks";
import { PreviewBlock } from "~/admin/components/PreviewBlock";
import { ResponsiveElementsProvider } from "~/admin/components/ResponsiveElementsProvider";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks";
import {
    SimpleForm,
    SimpleFormContent,
    SimpleFormHeader
} from "@webiny/app-admin/components/SimpleForm";

const t = i18n.ns("app-page-builder/admin/page-blocks/data-list");

type PageBlocksDataListProps = {
    filter: string;
    canCreate: boolean;
    canEdit: (item: CreatableItem) => boolean;
    canDelete: (item: CreatableItem) => boolean;
};

const PageBlocksDataList = ({ filter, canCreate, canEdit, canDelete }: PageBlocksDataListProps) => {
    const { history, location } = useRouter();
    const { showSnackbar } = useSnackbar();
    const [loadingLabel, setLoadingLabel] = useState("");
    const { showConfirmation } = useConfirmationDialog({
        title: "Delete page block",
        message: "Are you sure you want to delete this page block?"
    });
    const { showExportBlockInitializeDialog } = useExportBlockDialog();
    const pageBlocks = usePageBlocks();
    const [blocks, setPageBlocks] = useState<PbPageBlock[]>([]);

    const selectedBlocksCategory = new URLSearchParams(location.search).get("category");

    useEffect(() => {
        if (selectedBlocksCategory) {
            pageBlocks.listBlocks(selectedBlocksCategory).then(pageBlocks => {
                setPageBlocks(pageBlocks);
            });
        }
    }, [selectedBlocksCategory, pageBlocks.pageBlocks]);

    const filterData = useCallback(
        ({ name }: PbPageBlock) => {
            return name.toLowerCase().includes(filter);
        },
        [filter]
    );

    const filteredBlocksData: PbPageBlock[] = filter === "" ? blocks : blocks.filter(filterData);

    const deleteItem = useCallback(
        (pageBlock: PbPageBlock) => {
            showConfirmation(async () => {
                try {
                    await pageBlocks.deleteBlock(pageBlock.id);
                    showSnackbar(t`Block "{name}" deleted.`({ name: pageBlock.name }));
                } catch (error) {
                    showSnackbar(error.message);
                }
            });
        },
        [selectedBlocksCategory]
    );

    const duplicateItem = useCallback(async (item: PbPageBlock) => {
        setLoadingLabel(t`Creating a copy of "{name}"...`({ name: item.name }));

        const newName = `${item.name} (copy)`;
        try {
            await pageBlocks.createBlock({
                name: newName,
                category: item.blockCategory,
                content: item.content
            });
        } catch (error) {
            showSnackbar(error.message);
        }

        showSnackbar(t`"{name}" was created successfully!`({ name: newName }));
    }, []);

    const handleExportClick = useCallback((id: string) => {
        showExportBlockInitializeDialog({ ids: [id] });
    }, []);

    const showEmptyView = !pageBlocks.loading && !selectedBlocksCategory;

    // Render "No content selected" view.
    if (showEmptyView) {
        return (
            <EmptyView
                icon={<TableIcon />}
                title={t`Click on the left side list to display list of page blocks for selected category`}
                action={null}
            />
        );
    }

    const showNoRecordsView = !pageBlocks.loading && isEmpty(filteredBlocksData);
    // Render "No records found" view.
    if (showNoRecordsView) {
        return <EmptyView icon={<TableIcon />} title={t`No blocks found.`} />;
    }

    return (
        <>
            {pageBlocks.loading && (
                <OverlayLoader text={loadingLabel || pageBlocks.loadingLabel || "Loading..."} />
            )}
            <ResponsiveElementsProvider>
                {filteredBlocksData.map(pageBlock => (
                    <SimpleForm
                        key={pageBlock.id}
                        size={"lg"}
                        className={"wby-pt-none first:wby-pt-lg"}
                    >
                        <SimpleFormHeader title={pageBlock.name}>
                            <div className={"wby-flex wby-items-center wby-justify-end wby-gap-xs"}>
                                <Tooltip
                                    content={"Export block"}
                                    trigger={
                                        <IconButton
                                            variant="ghost"
                                            icon={<ExportIcon />}
                                            data-testid={"pb-blocks-list-block-export-btn"}
                                            onClick={() => handleExportClick(pageBlock.id)}
                                        />
                                    }
                                />
                                {canEdit(pageBlock) && (
                                    <Tooltip
                                        content={"Edit block"}
                                        trigger={
                                            <IconButton
                                                variant="ghost"
                                                icon={<EditIcon />}
                                                data-testid={"pb-blocks-list-block-edit-btn"}
                                                onClick={() =>
                                                    history.push(
                                                        `/page-builder/block-editor/${pageBlock.id}`
                                                    )
                                                }
                                            />
                                        }
                                    />
                                )}
                                {canCreate && (
                                    <Tooltip
                                        content={"Clone block"}
                                        trigger={
                                            <IconButton
                                                variant="ghost"
                                                data-testid={"pb-blocks-list-block-duplicate-btn"}
                                                icon={<CloneIcon />}
                                                onClick={() => duplicateItem(pageBlock)}
                                            />
                                        }
                                    />
                                )}
                                {canDelete(pageBlock) && (
                                    <Tooltip
                                        content={"Delete block"}
                                        trigger={
                                            <IconButton
                                                variant="ghost"
                                                data-testid={"pb-blocks-list-block-delete-btn"}
                                                onClick={() => deleteItem(pageBlock)}
                                                icon={<DeleteIcon />}
                                            />
                                        }
                                    />
                                )}
                            </div>
                        </SimpleFormHeader>
                        <SimpleFormContent className={"wby-p-0 wby-border-b-sm"}>
                            <PreviewBlock element={pageBlock} />
                        </SimpleFormContent>
                    </SimpleForm>
                ))}
            </ResponsiveElementsProvider>
        </>
    );
};

export default PageBlocksDataList;
