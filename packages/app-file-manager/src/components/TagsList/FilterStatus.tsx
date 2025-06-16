import React, { useCallback } from "react";
import { Button, Text } from "@webiny/admin-ui";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider";

interface FilterStatusProps {
    activeTags: string[];
    onActivatedTagsChange: (tags: string[]) => void;
}

export const FilterStatus = ({ activeTags, onActivatedTagsChange }: FilterStatusProps) => {
    const fmView = useFileManagerView();

    const resetTags = useCallback(() => {
        onActivatedTagsChange([]);
        fmView.tags.setFilterMode("OR");
    }, []);

    return (
        <div className={"wby-mb-md wby-flex wby-items-center wby-justify-between wby-gap-sm"}>
            <Text size={"sm"} className={"wby-text-neutral-muted"}>
                {activeTags.length} selected
            </Text>
            <Button
                onClick={resetTags}
                size={"sm"}
                variant={"ghost"}
                text={"Reset"}
                disabled={activeTags.length === 0}
            />
        </div>
    );
};
