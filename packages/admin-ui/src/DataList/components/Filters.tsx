import React from "react";
import { DropdownMenu } from "~/DropdownMenu";
import { FilterIcon } from "../DataListIcons";
import { DataListProps } from "../types";

const Filters = (props: DataListProps) => {
    const filters = props.filters;
    if (!filters) {
        return null;
    }

    return <DropdownMenu trigger={<FilterIcon size={"lg"} />}>{filters}</DropdownMenu>;
};

export { Filters };
