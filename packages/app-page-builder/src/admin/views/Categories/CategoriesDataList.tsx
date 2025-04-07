import React, { useCallback, useMemo, useState } from "react";
import { Button, Grid, Select } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { i18n } from "@webiny/app/i18n";
import { useRouter } from "@webiny/react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LIST_CATEGORIES, DELETE_CATEGORY } from "./graphql";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import orderBy from "lodash/orderBy";

import {
    DataList,
    DataListModalOverlay,
    DataListModalOverlayAction,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemMeta,
    ListActions,
    ListItemTextSecondary,
    ListItemTextPrimary
} from "@webiny/ui/List";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { PbCategory } from "~/types";
import { useCategoriesPermissions } from "~/hooks/permissions";

const t = i18n.ns("app-page-builder/admin/categories/data-list");

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

type PageBuilderCategoriesDataListProps = {
    canCreate: boolean;
};
const PageBuilderCategoriesDataList = ({ canCreate }: PageBuilderCategoriesDataListProps) => {
    const [filter, setFilter] = useState<string>("");
    const [sort, setSort] = useState<string>(SORTERS[0].sort);
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();
    const listQuery = useQuery(LIST_CATEGORIES);
    const [deleteIt, deleteMutation] = useMutation(DELETE_CATEGORY, {
        refetchQueries: [{ query: LIST_CATEGORIES }]
    });

    const filterData = useCallback(
        ({ slug, name, url }: PbCategory) => {
            return (
                slug.toLowerCase().includes(filter) ||
                name.toLowerCase().includes(filter) ||
                url.toLowerCase().includes(filter)
            );
        },
        [filter]
    );

    const sortData = useCallback(
        (categories: PbCategory[]) => {
            if (!sort) {
                return categories;
            }
            const [field, order] = sort.split("_");
            return orderBy(categories, field, order.toLowerCase() as "asc" | "desc");
        },
        [sort]
    );

    const { showConfirmation } = useConfirmationDialog();

    const data: PbCategory[] = listQuery?.data?.pageBuilder?.listCategories?.data || [];
    const slug = new URLSearchParams(location.search).get("slug");

    const deleteItem = useCallback(
        (item: PbCategory) => {
            showConfirmation(async () => {
                const response = await deleteIt({
                    variables: item
                });

                const error = response?.data?.pageBuilder?.deleteCategory?.error;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(t`Category "{slug}" deleted.`({ slug: item.slug }));

                if (slug === item.slug) {
                    history.push(`/page-builder/categories`);
                }
            });
        },
        [slug]
    );

    const { canDelete } = useCategoriesPermissions();

    const loading = [listQuery, deleteMutation].find(item => item.loading);

    const categoriesDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Grid.Column span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            options={SORTERS.map(({ label, sort: value }) => {
                                return {
                                    label,
                                    value
                                };
                            })}
                        />
                    </Grid.Column>
                </Grid>
            </DataListModalOverlay>
        ),
        [sort]
    );

    const filteredData: PbCategory[] = filter === "" ? data : data.filter(filterData);
    const categoryList: PbCategory[] = sortData(filteredData);

    return (
        <DataList
            title={t`Categories`}
            loading={Boolean(loading)}
            data={categoryList}
            actions={
                canCreate ? (
                    <Button
                        text={t`New`}
                        icon={<AddIcon />}
                        size={"sm"}
                        className={"wby-ml-xs"}
                        data-testid="data-list-new-record-button"
                        onClick={() => history.push("/page-builder/categories?new=true")}
                    />
                ) : null
            }
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={t`Search categories...`}
                    dataTestId={"pb.category.data-list.search-input"}
                />
            }
            modalOverlay={categoriesDataListModalOverlay}
            modalOverlayAction={
                <DataListModalOverlayAction data-testid={"default-data-list.filter"} />
            }
        >
            {({ data }: { data: PbCategory[] }) => (
                <ScrollList data-testid="default-data-list">
                    {data.map(item => (
                        <ListItem key={item.slug} selected={item.slug === slug}>
                            <ListItemText
                                onClick={() =>
                                    history.push(`/page-builder/categories?slug=${item.slug}`)
                                }
                            >
                                <ListItemTextPrimary>{item.name}</ListItemTextPrimary>
                                <ListItemTextSecondary>{item.url}</ListItemTextSecondary>
                            </ListItemText>

                            {canDelete(item?.createdBy?.id) && (
                                <ListItemMeta>
                                    <ListActions>
                                        <DeleteIcon onClick={() => deleteItem(item)} />
                                    </ListActions>
                                </ListItemMeta>
                            )}
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};

export default PageBuilderCategoriesDataList;
