import React, { useCallback } from "react";
import {
    CmsReferenceContentEntry,
    CmsReferenceValue
} from "~/admin/plugins/fieldRenderers/ref/components/types";
import { ReactComponent as SelectIcon } from "@webiny/icons/check_box_outline_blank.svg";
import { ReactComponent as SelectedIcon } from "@webiny/icons/check_box.svg";
import { IconButton, Tooltip } from "@webiny/admin-ui";

interface SelectProps {
    entry: CmsReferenceContentEntry;
    selected?: boolean;
    onChange: (value: CmsReferenceValue) => void;
}
export const Select = ({ entry, selected, onChange }: SelectProps) => {
    const onIconClick = useCallback(() => {
        onChange({
            id: entry.id,
            modelId: entry.model.modelId
        });
    }, [entry, onChange]);

    return (
        <Tooltip
            content={selected ? "Unselect" : "Select"}
            side={"top"}
            trigger={
                <IconButton
                    variant={"ghost"}
                    size={"sm"}
                    iconSize={"lg"}
                    onClick={onIconClick}
                    icon={selected ? <SelectedIcon /> : <SelectIcon />}
                />
            }
        />
    );
};
