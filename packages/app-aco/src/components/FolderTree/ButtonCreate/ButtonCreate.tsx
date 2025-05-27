import React from "react";
import { Button } from "@webiny/admin-ui";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as Plus } from "@webiny/icons/add.svg";
import { useCreateDialog } from "~/dialogs";

type ButtonCreateProps = {
    disabled?: boolean;
};

const t = i18n.ns("app-aco/components/folder-tree/button-create");

export const ButtonCreate = (props: ButtonCreateProps) => {
    const { showDialog } = useCreateDialog();

    return (
        <Button
            onClick={() => showDialog()}
            disabled={props.disabled}
            icon={<Plus />}
            text={t`Create folder`}
            variant={"secondary"}
            size={"sm"}
        />
    );
};
