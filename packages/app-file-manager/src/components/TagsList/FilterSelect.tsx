import React from "react";
import { Select, Text } from "@webiny/admin-ui";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";

const options = [
    {
        value: "OR",
        label: "match any"
    },
    {
        value: "AND",
        label: "match all"
    }
];

export const FilterSelect = () => {
    const fmView = useFileManagerView();

    return (
        <div className={"wby-flex wby-flex-col wby-gap-sm wby-mb-md"}>
            <Text className={"wby-font-semibold"}>Filter by tag</Text>
            <Select
                disabled={fmView.tags.activeTags.length < 2}
                size={"md"}
                variant={"secondary"}
                value={fmView.tags.filterMode}
                onChange={mode => fmView.tags.setFilterMode(mode)}
                options={options}
                displayResetAction={false}
            />
        </div>
    );
};
