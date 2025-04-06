import React from "react";
import { RefreshIcon } from "../DataListIcons";
import { DataListProps } from "../types";
import { Tooltip } from "~/Tooltip";

const RefreshButton = (props: DataListProps) => {
    const refresh = props.refresh;
    if (!refresh) {
        return null;
    }

    return (
        <Tooltip
            trigger={<RefreshIcon onClick={() => refresh()} size={"sm"} />}
            content={"Refresh list"}
        />
    );
};

export { RefreshButton };
