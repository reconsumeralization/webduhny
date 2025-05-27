import React from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add_circle_outline.svg";
import { IconButton, Tooltip } from "@webiny/admin-ui";

interface AddFilterProps {
    onClick: () => void;
}

export const AddFilter = ({ onClick }: AddFilterProps) => {
    return (
        <div className={"wby-my-md wby-text-center"}>
            <Tooltip
                content={"Add new condition"}
                side={"bottom"}
                trigger={<IconButton icon={<AddIcon />} onClick={onClick} variant={"ghost"} />}
            />
        </div>
    );
};
