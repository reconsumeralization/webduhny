import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { CmsReferenceContentEntry } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete_outline.svg";
import { useConfirmationDialog } from "@webiny/app-admin";
import { ButtonLink } from "./elements/ButtonLink";
import { useForm } from "@webiny/form";

const Text = styled("span")({
    fontFamily: "Source Sans Pro",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    textTransform: "uppercase"
});

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
        <ButtonLink onClick={onRemoveClick} maxWidth={"100px"}>
            <DeleteIcon />
            <Text>Remove</Text>
        </ButtonLink>
    );
};
