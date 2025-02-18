import React from "react";
import { i18n } from "@webiny/app/i18n";
import { Tooltip } from "@webiny/ui/Tooltip";
import { DeleteIcon } from "@webiny/ui/List/DataList/icons";
import { UserItem } from "~/UserItem";
import { useSecurity } from "@webiny/app-security";

const t = i18n.ns("app-identity/admin/users/data-list");

export interface DeleteActionProps {
    item: UserItem;
    onClick: () => void;
}

export const DeleteAction = ({ item, onClick }: DeleteActionProps) => {
    const { identity } = useSecurity();

    if (!identity) {
        return null;
    }

    if (identity.id === item.id) {
        return (
            <Tooltip
                placement={"bottom"}
                content={<span>{t`You can't delete your own user account.`}</span>}
            >
                <DeleteIcon disabled />
            </Tooltip>
        );
    }

    if (item.external) {
        return (
            <Tooltip
                placement={"bottom"}
                content={<span>{t`You can't delete external users.`}</span>}
            >
                <DeleteIcon disabled />
            </Tooltip>
        );
    }

    return <DeleteIcon onClick={onClick} data-testid={"default-data-list.delete"} />;
};
