import React from "react";
import { Button, Icon } from "@webiny/admin-ui";
import { ReactComponent as Delete } from "@webiny/icons/delete.svg";

export interface TrashBinButtonProps {
    onClick: () => void;
}

export const TrashBinButton = (props: TrashBinButtonProps) => {
    return (
        <Button
            onClick={props.onClick}
            variant={"ghost"}
            size={"lg"}
            text={"Trash"}
            icon={<Icon icon={<Delete />} label={"Trash"} size={"sm"} color={"neutral-light"} />}
        />
    );
};
