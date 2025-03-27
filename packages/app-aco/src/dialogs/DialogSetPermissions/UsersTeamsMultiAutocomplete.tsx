import React from "react";
import { MultiAutoComplete } from "@webiny/admin-ui";
import type { FolderLevelPermissionsTarget, FolderPermission } from "~/types";

interface UsersTeamsMultiAutocompleteProps {
    options: FolderLevelPermissionsTarget[];
    value: FolderPermission["target"][];
    onChange: (value: FolderPermission["target"][]) => void;
}

export const UsersTeamsMultiAutocomplete = ({
    options = [],
    onChange,
    value = []
}: UsersTeamsMultiAutocompleteProps) => {
    return (
        <>
            {/* A hack that ensures the autocomplete is not being auto-focused. */}
            <input style={{ position: "fixed", left: 10000 }} type="text" />
            <MultiAutoComplete
                label={"Add user or a team"}
                selectedOptionRenderer={() => null}
                options={options.map(option => {
                    return {
                        id: option.id,
                        label: option.name,
                        value: option.target
                    };
                })}
                uniqueValues={true}
                onValuesChange={values =>
                    onChange && onChange(values as Array<`admin:${string}` | `team:${string}`>)
                }
                values={value || []}
                displayResetAction={false}
                size={"lg"}
            />
        </>
    );
};
