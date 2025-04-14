import React, { useCallback, useMemo, useState } from "react";
import { i18n } from "@webiny/app/i18n";
import { useRouter } from "@webiny/react-router";
import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import {
    DataList,
    DataListModalOverlay,
    DataListModalOverlayAction,
    DownloadIcon,
    ListItem,
    ListItemGraphic,
    ListItemText,
    ListItemTextPrimary,
    ListItemTextSecondary,
    ScrollList,
    UploadIcon
} from "@webiny/ui/List";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { useSnackbar, useStateIfMounted, useStateWithCallback } from "@webiny/app-admin/hooks";
import { Icon } from "~/admin/utils/createBlockCategoryPlugin";
import { OptionsMenu } from "~/admin/components/OptionsMenu";
import { PbBlockCategory } from "~/types";
import { LIST_PAGE_CATEGORIES } from "./graphql";
import useImportBlock from "~/admin/views/PageBlocks/hooks/useImportBlock";
import useExportBlockDialog from "~/editor/plugins/defaultBar/components/ExportBlockButton/useExportBlockDialog";
import useFilteredCategoriesListData from "./hooks/useFilteredCategoriesListData";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks";
import {
    Button,
    Dialog,
    Grid,
    List as AdminList,
    OverlayLoader,
    Select,
    Text
} from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";

const t = i18n.ns("app-page-builder/admin/page-blocks/by-categories-data-list");

interface Sorter {
    label: string;
    sort: string;
}

const SORTERS: Sorter[] = [
    {
        label: t`Newest to oldest`,
        sort: "createdOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sort: "createdOn_ASC"
    },
    {
        label: t`Name A-Z`,
        sort: "name_ASC"
    },
    {
        label: t`Name Z-A`,
        sort: "name_DESC"
    }
];

type PageBuilderBlocksByCategoriesDataListProps = {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    canCreate: boolean;
};
const BlocksByCategoriesDataList = ({
    filter,
    setFilter,
    canCreate
}: PageBuilderBlocksByCategoriesDataListProps) => {
    const [sort, setSort] = useState<string>(SORTERS[2].sort);
    const [isDialogOpen, setIsDialogOpen] = useStateWithCallback<boolean>(false);
    const [creatingBlock, setCreatingBlock] = useStateIfMounted(false);
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const listQuery = useQuery(LIST_PAGE_CATEGORIES);
    const { showExportBlockInitializeDialog } = useExportBlockDialog();

    const blockCategoriesData: PbBlockCategory[] =
        listQuery?.data?.pageBuilder?.listBlockCategories?.data || [];

    const { loading: pageBlocksLoading, pageBlocks, createBlock } = usePageBlocks();

    const [filteredBlocksList, filteredBlockCategoriesList] = useFilteredCategoriesListData(
        pageBlocks,
        blockCategoriesData,
        sort,
        filter
    );

    const selectedBlocksCategory = new URLSearchParams(location.search).get("category");
    const loading = listQuery.loading || pageBlocksLoading;

    const blockCategoriesDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Grid.Column span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            options={SORTERS.map(({ label, sort: value }) => ({
                                label,
                                value
                            }))}
                        />
                    </Grid.Column>
                </Grid>
            </DataListModalOverlay>
        ),
        [sort]
    );

    const onCreatePageBlock = async (categorySlug: string) => {
        try {
            setCreatingBlock(true);
            const newBlock = await createBlock({ name: "New block", category: categorySlug });
            setCreatingBlock(false);
            setIsDialogOpen(false, () => {
                history.push(`/page-builder/block-editor/${newBlock.id}`);
            });
        } catch (error) {
            showSnackbar(error.message);
        }
    };

    const { showImportDialog } = useImportBlock();

    const handleExportClick = useCallback((selectedBlocksCategory?: string | null) => {
        showExportBlockInitializeDialog({ where: { blockCategory: selectedBlocksCategory } });
    }, []);

    const handleNewBlockClick = useCallback(() => {
        setIsDialogOpen(true);
    }, [selectedBlocksCategory]);

    return (
        <>
            <DataList
                title={t`Blocks`}
                loading={Boolean(loading)}
                data={filteredBlockCategoriesList}
                actions={
                    <>
                        {canCreate ? (
                            <Button
                                text={t`New`}
                                icon={<AddIcon />}
                                size={"sm"}
                                className={"wby-ml-xs"}
                                onClick={handleNewBlockClick}
                                data-testid={"pb-blocks-list-new-block-btn"}
                            />
                        ) : null}
                        <OptionsMenu
                            data-testid="pb-blocks-list-options-menu"
                            items={[
                                {
                                    label: "Import blocks",
                                    icon: <UploadIcon />,
                                    onClick: showImportDialog
                                },
                                {
                                    label: "Export all blocks",
                                    icon: <DownloadIcon />,
                                    onClick: () => handleExportClick()
                                },
                                {
                                    label: "Export blocks from current category",
                                    icon: <DownloadIcon />,
                                    onClick: () => handleExportClick(selectedBlocksCategory),
                                    disabled: !selectedBlocksCategory
                                }
                            ]}
                        />
                    </>
                }
                search={
                    <SearchUI
                        value={filter}
                        onChange={setFilter}
                        inputPlaceholder={t`Search blocks...`}
                        dataTestId={"pb.blocks.data-list.search-input"}
                    />
                }
                showOptions={{ refresh: false }}
                modalOverlay={blockCategoriesDataListModalOverlay}
                modalOverlayAction={
                    <DataListModalOverlayAction data-testid={"default-data-list.filter"} />
                }
            >
                {({ data }: { data: PbBlockCategory[] }) => (
                    <ScrollList data-testid="default-data-list">
                        {data.map(item => {
                            const numberOfBlocks = filteredBlocksList.filter(
                                pageBlock => pageBlock.blockCategory === item.slug
                            ).length;
                            return (
                                <ListItem
                                    key={item.slug}
                                    selected={item.slug === selectedBlocksCategory}
                                    onClick={() =>
                                        history.push(
                                            `/page-builder/page-blocks?category=${item.slug}`
                                        )
                                    }
                                >
                                    <ListItemGraphic>
                                        <Icon category={item} />
                                    </ListItemGraphic>
                                    <ListItemText>
                                        <ListItemTextPrimary>{item.name}</ListItemTextPrimary>
                                        <ListItemTextSecondary>{`${numberOfBlocks} ${
                                            numberOfBlocks === 1 ? "block" : "blocks"
                                        } in the category`}</ListItemTextSecondary>
                                    </ListItemText>
                                </ListItem>
                            );
                        })}
                    </ScrollList>
                )}
            </DataList>
            <Dialog
                open={isDialogOpen}
                onOpenChange={open => !open && setIsDialogOpen(false)}
                title={"Please select a block category"}
                actions={
                    <>
                        <Dialog.CancelButton />
                        <Dialog.ConfirmButton
                            data-testid={"pb-blocks-list-new-block-category-btn"}
                            onClick={() => history.push("/page-builder/block-categories?new=true")}
                        />
                    </>
                }
                bodyPadding={false}
            >
                {creatingBlock ? <OverlayLoader text={"Creating page block..."} /> : null}
                <>
                    {isEmpty(blockCategoriesData) ? (
                        <Text size={"sm"}>There are no block categories</Text>
                    ) : (
                        <AdminList>
                            {blockCategoriesData.map(item => (
                                <AdminList.Item
                                    key={item.slug}
                                    onClick={() => onCreatePageBlock(item.slug)}
                                    icon={<Icon category={item} />}
                                    title={item.name}
                                    description={item.slug}
                                />
                            ))}
                        </AdminList>
                    )}
                </>
            </Dialog>
        </>
    );
};

export default BlocksByCategoriesDataList;
