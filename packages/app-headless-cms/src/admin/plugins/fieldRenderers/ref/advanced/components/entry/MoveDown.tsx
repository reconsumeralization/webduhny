import React from "react";
import { ReactComponent as MoveDownIcon } from "@webiny/icons/keyboard_arrow_down.svg";
import { IconButton, Tooltip } from "@webiny/admin-ui";

interface MoveDownProps {
    onClick: (ev: React.MouseEvent) => void;
    className?: string;
}

export const MoveDown = ({ onClick, className }: MoveDownProps) => {
    return (
        <Tooltip
            content={"Shift+Click to move to bottom"}
            side={"top"}
            trigger={
                <IconButton
                    variant={"ghost"}
                    size={"sm"}
                    iconSize={"lg"}
                    onClick={onClick}
                    className={className}
                    icon={<MoveDownIcon />}
                />
            }
        />
    );
};
