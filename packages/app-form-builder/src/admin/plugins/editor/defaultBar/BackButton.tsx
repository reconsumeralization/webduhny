import React from "react";
import { ReactComponent as BackIcon } from "@webiny/icons/arrow_back.svg";
import { useRouter } from "@webiny/react-router";
import { IconButton } from "@webiny/admin-ui";

const BackButton = React.memo(() => {
    const { params, history } = useRouter();

    const id = params ? params["id"] : undefined;

    return (
        <IconButton
            variant={"ghost"}
            iconSize={"lg"}
            data-testid="fb-editor-back-button"
            onClick={() => {
                if (!id) {
                    console.error("Could not determine FormID from params.");
                    return;
                }
                history.push(`/form-builder/forms?id=${id}`);
            }}
            icon={<BackIcon />}
        />
    );
});

BackButton.displayName = "BackButton";

export default BackButton;
