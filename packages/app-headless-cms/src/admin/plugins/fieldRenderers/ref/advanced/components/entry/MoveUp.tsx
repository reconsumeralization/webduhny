import React from "react";
import { ReactComponent as MoveUpIcon } from "@webiny/icons/keyboard_arrow_up.svg";
import { IconButton, Tooltip } from "@webiny/admin-ui";

interface MoveUpProps {
    onClick: (ev: React.MouseEvent) => void;
    className?: string;
}

export const MoveUp = ({ onClick, className }: MoveUpProps) => {
    return (
        <Tooltip
            content={"Shift+Click to move to top"}
            side={"top"}
            trigger={
                <IconButton
                    variant={"ghost"}
                    size={"sm"}
                    iconSize={"lg"}
                    onClick={onClick}
                    className={className}
                    icon={<MoveUpIcon />}
                />
            }
        />
    );
};
