import React from "react";
import { ReactComponent as Delete } from "@webiny/icons/delete.svg";
import { useDeleteTrashBinItem, useTrashBinItem } from "~/Presentation/hooks";
import { TrashBinListConfig } from "~/Presentation/configs";

export const DeleteItemAction = () => {
    const { item } = useTrashBinItem();
    const { openDialogDeleteItem } = useDeleteTrashBinItem({ item });
    const { OptionsMenuItem } = TrashBinListConfig.Browser.EntryAction;

    return (
        <OptionsMenuItem
            icon={<Delete />}
            label={"Delete"}
            onAction={openDialogDeleteItem}
            className={"!wby-text-destructive-primary [&_svg]:wby-fill-destructive"}
        />
    );
};
