import React, { useCallback, useEffect, useMemo, useState } from "react";
import Files, { FilesRenderChildren } from "react-butterfiles";
import debounce from "lodash/debounce";
import omit from "lodash/omit";
import { positionValues } from "react-custom-scrollbars";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { observer } from "mobx-react-lite";
import { Heading, type DataTableSorting, Scrollbar } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { OverlayLayout, useSnackbar } from "@webiny/app-admin";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView";
import { useI18N } from "@webiny/app-i18n";
import { useTenancy } from "@webiny/app-tenancy";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";
import { outputFileSelectionError } from "./outputFileSelectionError";
import { LeftSidebar } from "./LeftSidebar";
import { useFileManagerViewConfig } from "~/index";
import { FileItem } from "@webiny/app-admin/types";
import { BatchFileUploader } from "~/BatchFileUploader";
import { ListFilesSort, ListFilesSortItem } from "~/modules/FileManagerApiProvider/graphql";
import { TableItem } from "~/types";

import { BottomInfoBar } from "~/components/BottomInfoBar";
import { BulkActions } from "~/components/BulkActions";
import { FileDropPlaceholder } from "~/components/FileDropPlaceholder";
import { Empty } from "~/components/Empty";
import { FileDetails } from "~/components/FileDetails";
import { Filters } from "~/components/Filters";
import { Grid } from "~/components/Grid";
import { Header } from "~/components/Header";
import { SearchWidget } from "~/components/SearchWidget";
import { Table, TableProps } from "~/components/Table";
import { TagsList } from "~/components/TagsList";
import { UploadStatus } from "~/components/UploadStatus";

const t = i18n.ns("app-admin/file-manager/file-manager-view");

type GetFileUploadErrorMessageProps =
    | string
    | {
          message: string;
      };

const createSort = (sorting?: DataTableSorting): ListFilesSort | undefined => {
    if (!sorting?.length) {
        return undefined;
    }
    return sorting.reduce<ListFilesSort>((items, item) => {
        const sort = `${item.id}_${item.desc ? "DESC" : "ASC"}` as ListFilesSortItem;
        if (items.includes(sort)) {
            return items;
        }
        items.push(sort);
        return items;
    }, []);
};

/**
 * Generates a `layoutId` to be used with the `<SplitView />` component.
 * The `layoutId` is essential for saving user preferences into localStorage.
 * The generation of the `layoutId` takes into account the current `tenantId`, `localeCode`, and the provided `applicationId`.
 *
 *  TODO: export the useLayoutId from a generic use package, such as app-admin. At the moment is not possible because of circular dependency issues.
 */
const useLayoutId = (applicationId: string) => {
    const { tenant } = useTenancy();
    const { getCurrentLocale } = useI18N();
    const localeCode = getCurrentLocale("content");

    if (!tenant || !localeCode) {
        console.warn("Missing tenant or localeCode while creating layoutId");
        return null;
    }

    return `T#${tenant}#L#${localeCode}#A#${applicationId}`;
};

const FileManagerView = () => {
    const view = useFileManagerView();
    const { browser } = useFileManagerViewConfig();
    const { showSnackbar } = useSnackbar();
    const [drawerLoading, setDrawerLoading] = useState<string | null>(null);

    const uploader = useMemo<BatchFileUploader>(
        () => new BatchFileUploader(view.uploadFile),
        [view.folderId]
    );

    const [tableSorting, setTableSorting] = useState<DataTableSorting>([]);
    const [currentFile, setCurrentFile] = useState<FileItem>();
    const layoutId = useLayoutId("fm:file");

    useEffect(() => {
        const fetchFileDetails = async () => {
            if (view.showingFileDetails) {
                setDrawerLoading("Loading file details...");
                const file = await view.getFile(view.showingFileDetails);
                setCurrentFile(file);
            } else {
                setCurrentFile(undefined);
            }
            setDrawerLoading(null);
        };

        // call the function
        fetchFileDetails();
    }, [view.showingFileDetails]);

    useEffect(() => {
        if (!tableSorting?.length) {
            return;
        }
        const sort = createSort(tableSorting);
        if (!sort) {
            return;
        }
        view.setListSort(sort);
    }, [tableSorting]);

    const getFileUploadErrorMessage = useCallback((e: GetFileUploadErrorMessageProps) => {
        if (typeof e === "string") {
            const match = e.match(/Message>(.*?)<\/Message/);
            if (match) {
                const [, message] = match;
                return message;
            }

            return e;
        }
        return e.message;
    }, []);

    useHotkeys({
        zIndex: 20,
        keys: {
            esc: view.onClose
        }
    });

    const uploadFiles = async (files: File[]) => {
        uploader.addFiles(files);
        view.setIsUploadProgressIndicatorVisible(true);

        uploader.onUploadFinished(({ uploaded, errors }) => {
            uploader.reset();
            view.setIsUploadProgressIndicatorVisible(true);

            if (errors.length > 0) {
                showSnackbar(
                    <>
                        {t`One or more files were not uploaded successfully:`}
                        <ol>
                            {errors.map(({ file, e }) => (
                                <li key={file.name}>
                                    <strong>{file.name}</strong>: {getFileUploadErrorMessage(e)}
                                </li>
                            ))}
                        </ol>
                    </>
                );
                return;
            }

            showSnackbar(t`File upload complete.`, { timeout: 3000 });

            view.onUploadCompletion(uploaded);
        });
    };

    const filesBeingUploaded = uploader.getJobs().length;
    const progress = uploader.progress;

    const renderList = (browseFiles: FilesRenderChildren["browseFiles"]) => {
        if (!view.isListLoading && view.isSearch && view.files.length === 0) {
            return <Empty isSearchResult={true} browseFiles={browseFiles} />;
        }

        if (!view.isListLoading && view.files.length === 0 && view.folders.length === 0) {
            return <Empty isSearchResult={false} browseFiles={browseFiles} />;
        }

        if (view.listTable) {
            const getSelectableRow = (rows: TableItem[]) =>
                rows
                    .filter(row => row.$type === "RECORD")
                    .map(row => omit(row, ["$type", "$selectable"]) as FileItem);

            const onSelectRow: TableProps["onSelectRow"] = view.hasOnSelectCallback
                ? rows => {
                      const files = getSelectableRow(rows);

                      if (view.multiple) {
                          view.setSelected(files);
                      } else {
                          view.onChange(files[0]);
                      }
                  }
                : rows => {
                      const files = getSelectableRow(rows);
                      view.setSelected(files);
                  };

            const onToggleRow: TableProps["onToggleRow"] = view.hasOnSelectCallback
                ? row => {
                      const files = getSelectableRow([row]);

                      if (view.multiple) {
                          view.toggleSelected(files[0]);
                      } else {
                          view.onChange(files[0]);
                      }
                  }
                : row => {
                      const files = getSelectableRow([row]);
                      view.toggleSelected(files[0]);
                  };

            return (
                <Table
                    onSelectRow={onSelectRow}
                    onToggleRow={onToggleRow}
                    sorting={tableSorting}
                    onSortingChange={setTableSorting}
                />
            );
        }

        return (
            <Grid
                folders={view.folders}
                records={view.files}
                loading={view.isListLoading}
                onFolderClick={view.setFolderId}
                selected={view.selected}
                multiple={view.multiple}
                toggleSelected={view.toggleSelected}
                deselectAll={view.deselectAll}
                onChange={view.onChange}
                onClose={view.onClose}
                hasOnSelectCallback={view.hasOnSelectCallback}
                displaySubFolders={view.displaySubFolders}
            />
        );
    };

    const loadMoreOnScroll = useCallback(
        debounce(async ({ scrollFrame }: { scrollFrame: positionValues }) => {
            if (scrollFrame.top > 0.8) {
                view.loadMoreFiles();
            }
        }, 200),
        [view.meta, view.loadMoreFiles]
    );

    const updateFile = useCallback(
        async (data: FileItem) => {
            const { id, ...fileData } = data;
            setDrawerLoading("Saving file changes...");
            await view.updateFile(id, fileData);
            setDrawerLoading(null);
            showSnackbar("File updated successfully!");
            view.hideFileDetails();
        },
        [view.updateFile]
    );

    return (
        <>
            <Files
                multiple
                maxSize={view.settings ? view.settings.uploadMaxFileSize + "b" : "1TB"}
                multipleMaxSize={"1TB"}
                accept={view.accept}
                onSuccess={files => {
                    const filesToUpload = files
                        .map(file => file.src.file)
                        .filter(Boolean) as File[];
                    uploadFiles(filesToUpload);
                }}
                onError={errors => {
                    const message = outputFileSelectionError(errors);
                    showSnackbar(message);
                }}
            >
                {({ getDropZoneProps, browseFiles }) => (
                    <OverlayLayout
                        variant={"strong"}
                        onExited={view.onClose}
                        barLeft={<Heading level={5}>{"File manager"}</Heading>}
                        barMiddle={<SearchWidget />}
                    >
                        <>
                            <FileDetails
                                loading={drawerLoading}
                                file={currentFile}
                                open={Boolean(view.showingFileDetails)}
                                onClose={view.hideFileDetails}
                                onSave={updateFile}
                            />
                            <SplitView layoutId={layoutId}>
                                <LeftPanel span={2}>
                                    <LeftSidebar
                                        currentFolder={view.folderId}
                                        onFolderClick={view.setFolderId}
                                    >
                                        {browser.filterByTags ? (
                                            <TagsList
                                                loading={view.tags.loading}
                                                activeTags={view.tags.activeTags}
                                                tags={view.tags.allTags}
                                                onActivatedTagsChange={view.tags.setActiveTags}
                                            />
                                        ) : null}
                                    </LeftSidebar>
                                </LeftPanel>
                                <RightPanel span={10}>
                                    <div
                                        className={"wby-flex wby-flex-col wby-relative"}
                                        style={{ height: "calc(100vh - 69px" }}
                                    >
                                        <Header browseFiles={browseFiles} />
                                        <div
                                            className={"wby-flex-1"}
                                            {...getDropZoneProps({
                                                onDragOver: () => view.setDragging(true),
                                                onDragLeave: () => view.setDragging(false),
                                                onDrop: () => view.setDragging(false)
                                            })}
                                            data-testid={"fm-list-wrapper"}
                                        >
                                            <BulkActions />
                                            <Filters />
                                            <Scrollbar
                                                onScrollFrame={scrollFrame =>
                                                    loadMoreOnScroll({ scrollFrame })
                                                }
                                            >
                                                {renderList(browseFiles)}
                                            </Scrollbar>
                                            {view.dragging && <FileDropPlaceholder />}
                                            <UploadStatus
                                                numberOfFiles={filesBeingUploaded}
                                                progress={progress}
                                                isVisible={view.isUploadProgressIndicatorVisible}
                                                setIsVisible={
                                                    view.setIsUploadProgressIndicatorVisible
                                                }
                                            />
                                        </div>
                                        <BottomInfoBar
                                            accept={view.accept}
                                            listing={view.isListLoadingMore}
                                            loading={view.isListLoading}
                                            totalCount={view.meta?.totalCount ?? 0}
                                            currentCount={view.files.length}
                                        />
                                    </div>
                                </RightPanel>
                            </SplitView>
                        </>
                    </OverlayLayout>
                )}
            </Files>
        </>
    );
};

export default observer(FileManagerView);
