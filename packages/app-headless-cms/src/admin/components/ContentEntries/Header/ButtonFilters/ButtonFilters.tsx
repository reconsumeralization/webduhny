import React, { useCallback } from "react";
import { FiltersToggle } from "@webiny/app-admin";
import { useContentEntriesList } from "~/admin/views/contentEntries/hooks";

export const ButtonFilters = () => {
    const list = useContentEntriesList();

    const toggleFilters = useCallback(() => {
        if (list.showingFilters) {
            list.hideFilters();
            return;
        }
        list.showFilters();
    }, [list.showingFilters]);

    return (
        <FiltersToggle
            onFiltersToggle={toggleFilters}
            showingFilters={list.showingFilters}
            data-testid="cms.list-entries.toggle-filters"
        />
    );
};
