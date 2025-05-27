import React, { useCallback } from "react";
import { CmsReferenceContentEntry } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { useConfirmationDialog } from "@webiny/app-admin";
import { useForm } from "@webiny/form";
import { IconButton, Tooltip } from "@webiny/admin-ui";

interface RemoveProps {
    entry: CmsReferenceContentEntry;
    onRemove: (entryId: string) => void;
}

export const Remove = ({ entry, onRemove }: RemoveProps) => {
    const {} = useForm();
    const { showConfirmation } = useConfirmationDialog({
        title: "Remove referenced entry",
        message: `Are you sure you want to remove the referenced entry "${entry.title}"?`,
        acceptLabel: "Yes, I'm sure!"
    });

    const onRemoveClick = useCallback(() => {
        showConfirmation(() => {
            onRemove(entry.entryId);
        });
    }, [entry, onRemove]);

    return (
        <Tooltip
            content={"Remove"}
            side={"top"}
            trigger={
                <IconButton
                    variant={"ghost"}
                    size={"sm"}
                    iconSize={"lg"}
                    onClick={onRemoveClick}
                    icon={<DeleteIcon />}
                />
            }
        />
    );
};
