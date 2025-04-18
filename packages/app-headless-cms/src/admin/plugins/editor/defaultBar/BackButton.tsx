import React from "react";
import { useRouter } from "@webiny/react-router";
import { ReactComponent as BackIcon } from "@webiny/icons/arrow_back.svg";
import { IconButton } from "@webiny/admin-ui";

const BackButton = React.memo(() => {
    const { history } = useRouter();

    return (
        <IconButton
            data-testid="cms-editor-back-button"
            onClick={() => history.push(`/cms/content-models`)}
            icon={<BackIcon />}
            variant="ghost"
        />
    );
});

BackButton.displayName = "BackButton";

export default BackButton;
