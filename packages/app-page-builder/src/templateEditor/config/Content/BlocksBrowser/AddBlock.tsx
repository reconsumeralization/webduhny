import React from "react";
import { Button } from "@webiny/admin-ui";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { useBlocksBrowser } from "./useBlocksBrowser";

export const AddBlock = () => {
    const { openBrowser } = useBlocksBrowser();

    return (
        <Button
            className={"wby-fixed wby-z-101 wby-bottom-20 wby-right-[calc(320px)]"}
            onClick={openBrowser}
            icon={<AddIcon />}
        />
    );
};
