import React from "react";

import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { IconButton } from "@webiny/ui/Button";
import { Tooltip } from "@webiny/ui/Tooltip";

interface RemoveOperationProps {
    onClick: () => void;
    disabled: boolean;
}

export const RemoveOperation = ({ onClick, disabled }: RemoveOperationProps) => {
    return (
        <Tooltip content={"Remove operation"} placement={"bottom"}>
            <IconButton
                label={"Remove operation"}
                icon={<DeleteIcon />}
                onClick={onClick}
                disabled={disabled}
            />
        </Tooltip>
    );
};
