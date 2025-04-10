import React, { useCallback, useMemo, useState } from "react";
import orderBy from "lodash/orderBy";
import { Button, Grid, Select } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { i18n } from "@webiny/app/i18n";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta,
    ListActions,
    DataListModalOverlayAction,
    DataListModalOverlay,
    ListItemTextPrimary
} from "@webiny/ui/List";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { useRouter } from "@webiny/react-router";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useConfirmationDialog } from "@webiny/app-admin/hooks/useConfirmationDialog";
import * as GQL from "./graphql";
import { deserializeSorters } from "../utils";
import { ApiKey } from "~/types";

const t = i18n.ns("app-security/admin/groups/data-list");

const SORTERS = [
    {
        label: t`Newest to oldest`,
        sorter: "createdOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sorter: "createdOn_ASC"
    },
    {
        label: t`Name A-Z`,
        sorter: "name_ASC"
    },
    {
        label: t`Name Z-A`,
        sorter: "name_DESC"
    }
];
export interface ApiKeysDataListProps {
    // TODO @ts-refactor delete and go up the tree and sort it out
    [key: string]: any;
}
export const ApiKeysDataList = () => {
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState<string>(SORTERS[0].sorter);
    const { history, location } = useRouter();
    const { showSnackbar } = useSnackbar();
    const { showConfirmation } = useConfirmationDialog({
        dataTestId: "default-data-list.delete-dialog"
    });

    const filterAPIKey = useCallback(
        ({ description, name }: ApiKey) => {
            return (
                (description && description.toLowerCase().includes(filter)) ||
                name.toLowerCase().includes(filter)
            );
        },
        [filter]
    );

    const sortKeys = useCallback(
        (list: ApiKey[]) => {
            if (!sort) {
                return list;
            }
            const [key, value] = deserializeSorters(sort);
            return orderBy(list, [key], [value]);
        },
        [sort]
    );

    const { data: listResponse, loading: listLoading } = useQuery<GQL.ListApiKeysResponse>(
        GQL.LIST_API_KEYS
    );

    const [deleteIt, { loading: deleteLoading }] = useMutation(GQL.DELETE_API_KEY, {
        refetchQueries: [{ query: GQL.LIST_API_KEYS }]
    });

    const data = listLoading && !listResponse ? [] : listResponse?.security.apiKeys.data || [];
    const id = new URLSearchParams(location.search).get("id");

    const deleteItem = useCallback(
        (item: ApiKey) => {
            showConfirmation(async () => {
                const { data } = await deleteIt({
                    variables: item
                });

                const { error } = data.security.deleteApiKey;
                if (error) {
                    return showSnackbar(error.message);
                }

                showSnackbar(t`Api key "{id}" deleted.`({ id: item.id }));

                if (id === item.id) {
                    history.push(`/access-management/api-keys`);
                }
            });
        },
        [id]
    );

    const groupsDataListModalOverlay = useMemo(
        () => (
            <DataListModalOverlay>
                <Grid>
                    <Grid.Column span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            options={SORTERS.map(({ label, sorter: value }) => {
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

    const filteredData = filter === "" ? data : data.filter(filterAPIKey);
    const list = sortKeys(filteredData);

    return (
        <DataList
            title={t`API keys`}
            actions={
                <Button
                    text={t`New`}
                    icon={<AddIcon />}
                    size={"sm"}
                    className={"wby-ml-xs"}
                    data-testid="new-record-button"
                    onClick={() => history.push("/access-management/api-keys?new=true")}
                />
            }
            data={list}
            loading={listLoading || deleteLoading}
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={t`Search API keys...`}
                />
            }
            modalOverlay={groupsDataListModalOverlay}
            modalOverlayAction={
                <DataListModalOverlayAction data-testid={"default-data-list.filter"} />
            }
        >
            {({ data }: { data: ApiKey[] }) => (
                <ScrollList data-testid="default-data-list">
                    {data.map(item => (
                        <ListItem key={item.id} selected={item.id === id}>
                            <ListItemText
                                onClick={() =>
                                    history.push(`/access-management/api-keys?id=${item.id}`)
                                }
                            >
                                <ListItemTextPrimary>{item.name}</ListItemTextPrimary>
                                <ListItemTextSecondary>{item.description}</ListItemTextSecondary>
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <DeleteIcon
                                        onClick={() => deleteItem(item)}
                                        data-testid={"default-data-list.delete"}
                                    />
                                </ListActions>
                            </ListItemMeta>
                        </ListItem>
                    ))}
                </ScrollList>
            )}
        </DataList>
    );
};
