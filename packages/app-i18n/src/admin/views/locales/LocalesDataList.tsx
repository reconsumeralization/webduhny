import React, { useMemo } from "react";
import { Button, Select } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { i18n } from "@webiny/app/i18n";
import {
    DataList,
    ScrollList,
    ListItem,
    ListItemText,
    ListItemMeta,
    ListActions,
    ListItemTextSecondary,
    DataListModalOverlayAction,
    ListItemTextPrimary
} from "@webiny/ui/List";

import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { useLocalesList } from "./hooks/useLocalesList";
import { I18NLocaleItem } from "~/types";

const t = i18n.ns("app-i18n/admin/locales/data-list");

const SORTERS = [
    {
        label: t`Code A-Z` as string,
        sorter: "code_ASC"
    },
    {
        label: t`Code Z-A` as string,
        sorter: "code_DESC"
    }
];

const LocalesDataList = () => {
    const {
        locales,
        loading,
        currentLocaleCode,
        createLocale,
        filter,
        setFilter,
        sort,
        setSort,
        editLocale,
        deleteLocale
    } = useLocalesList({ sorters: SORTERS });

    const localesDataListModalOverlay = useMemo(
        () => (
            <Select
                value={sort || ""}
                onChange={setSort}
                label={t`Sort by`}
                options={SORTERS.map(({ label, sorter: value }) => ({
                    label,
                    value
                }))}
            />
        ),
        [sort]
    );

    return (
        <DataList
            loading={loading}
            actions={
                <Button
                    text={t`New`}
                    icon={<AddIcon />}
                    size={"sm"}
                    className={"wby-ml-xs"}
                    data-testid="new-record-button"
                    onClick={createLocale}
                />
            }
            data={locales}
            title={t`Locales`}
            search={
                <SearchUI
                    value={filter}
                    onChange={setFilter}
                    inputPlaceholder={t`Search locales...`}
                />
            }
            modalOverlay={localesDataListModalOverlay}
            modalOverlayAction={<DataListModalOverlayAction />}
        >
            {({ data }: { data: I18NLocaleItem[] }) => (
                <ScrollList data-testid="default-data-list">
                    {data.map(item => (
                        <ListItem key={item.code} selected={item.code === currentLocaleCode}>
                            <ListItemText onClick={() => editLocale(item)}>
                                <ListItemTextPrimary>{item.code}</ListItemTextPrimary>
                                <ListItemTextSecondary>
                                    {item.default && t`Default locale`}
                                </ListItemTextSecondary>
                            </ListItemText>

                            <ListItemMeta>
                                <ListActions>
                                    <DeleteIcon
                                        onClick={() => deleteLocale(item)}
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

export default LocalesDataList;
