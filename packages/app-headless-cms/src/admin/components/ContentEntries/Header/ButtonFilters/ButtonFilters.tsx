import React, { useCallback } from "react";
import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as FilterIcon } from "@webiny/icons/filter_list.svg";
import { ReactComponent as CloseFilterIcon } from "@webiny/icons/filter_list_off.svg";

import { useContentEntriesList } from "~/admin/views/contentEntries/hooks";

interface IconProps {
    showingFilters?: boolean;
}

const Icon = ({ showingFilters }: IconProps) => {
    return showingFilters ? <CloseFilterIcon /> : <FilterIcon />;
};
const IconComponent = React.memo(Icon);

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
        <IconButton
            variant={"ghost"}
            icon={<IconComponent showingFilters={list.showingFilters} />}
            onClick={toggleFilters}
            data-testid="cms.list-entries.toggle-filters"
        />
    );
};
