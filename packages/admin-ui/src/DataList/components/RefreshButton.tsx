import React from "react";
import { RefreshIcon } from "../DataListIcons";
import { DataListProps } from "../types";

const RefreshButton = (props: DataListProps) => {
    const refresh = props.refresh;
    if (!refresh) {
        return null;
    }

    return <RefreshIcon onClick={() => refresh()} size={"lg"} />;
};

export { RefreshButton };
