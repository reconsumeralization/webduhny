import React from "react";
import { ReactComponent as BackIcon } from "@webiny/icons/arrow_back.svg";
import { IconButton } from "@webiny/admin-ui";
import { useNavigatePage } from "~/admin/hooks/useNavigatePage";

export const BackButton = () => {
    const navigate = useNavigatePage();

    return (
        <IconButton
            variant={"ghost"}
            className={"wby-mr-sm-plus"}
            data-testid="pb-editor-back-button"
            onClick={navigate.navigateToLatestFolder}
            icon={<BackIcon />}
        />
    );
};
