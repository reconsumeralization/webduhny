import React, { useContext } from "react";
import { DataListModalOverlayContext } from "./DataListModalOverlayContext";
import { FilterIcon } from "~/List";

export interface DataListModalOverlayActionProps {
    "data-testid"?: string;
}

export const DataListModalOverlayAction = (props: DataListModalOverlayActionProps) => {
    const { isOpen, setIsOpen } = useContext(DataListModalOverlayContext);

    return <FilterIcon {...props} size={"lg"} onClick={() => setIsOpen(!isOpen)} />;
};
