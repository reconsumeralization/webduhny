import React, { useCallback } from "react";
import { useNavigate } from "@webiny/react-router";
import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as BackIcon } from "@webiny/icons/arrow_back.svg";
import { TopBar } from "~/editor/config/TopBar/TopBar";

export function BackButton() {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            <IconButton
                className={"mr-sm-plus"}
                data-testid="pb-editor-back-button"
                onClick={onClick}
                icon={<BackIcon />}
            />
            <TopBar.Divider />
        </>
    );
}
