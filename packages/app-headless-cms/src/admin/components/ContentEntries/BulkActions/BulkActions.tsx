import React, { useMemo } from "react";
import { Text, IconButton, Button } from "@webiny/admin-ui";
import { ReactComponent as Close } from "@webiny/icons/close.svg";
import { Buttons } from "@webiny/app-admin";

import { useContentEntryListConfig } from "~/admin/config/contentEntries";
import { useContentEntriesList } from "~/admin/views/contentEntries/hooks";

import { i18n } from "@webiny/app/i18n";

const t = i18n.ns("app-headless-cms/admin/content-entries/bulk-actions");

export const getEntriesLabel = (): string => {
    const { selected, isSelectedAll } = useContentEntriesList();

    if (isSelectedAll) {
        return "all entries";
    }

    return `${selected.length} ${selected.length === 1 ? "entry" : "entries"}`;
};

export const SelectAll = () => {
    const list = useContentEntriesList();

    if (!list.showingSelectAll) {
        return null;
    }

    return (
        <div data-testid={"select-all-container"}>
            {list.isSelectedAll ? (
                <Button
                    text={"Clear selection"}
                    onClick={list.unselectAll}
                    size={"sm"}
                    variant={"ghost"}
                />
            ) : (
                <Button
                    text={"Select all remaining entries"}
                    onClick={list.selectAll}
                    size={"sm"}
                    variant={"secondary"}
                />
            )}
        </div>
    );
};

export const BulkActions = () => {
    const { browser } = useContentEntryListConfig();
    const { selected, setSelected, isSelectedAll } = useContentEntriesList();

    const headline = useMemo((): string => {
        if (isSelectedAll) {
            return t("All entries selected");
        }

        return t`{count|count:1:entry:default:entries} selected`({
            count: selected.length
        });
    }, [selected.length, isSelectedAll]);

    if (!selected.length) {
        return null;
    }

    return (
        <div className={"wby-w-full wby-bg-neutral-disabled wby-px-md wby-py-sm"}>
            <div className={"wby-flex wby-items-center wby-justify-between wby-gap-sm"}>
                <div className={"wby-flex wby-items-center wby-gap-sm"}>
                    <Text size={"sm"} className={"wby-text-neutral-strong"}>
                        {headline}
                    </Text>
                    <SelectAll />
                </div>

                <div className={"wby-flex wby-items-center wby-gap-sm"}>
                    <Buttons actions={browser.bulkActions} />
                    <IconButton
                        variant={"ghost"}
                        size={"sm"}
                        icon={<Close />}
                        onClick={() => setSelected([])}
                    />
                </div>
            </div>
        </div>
    );
};
