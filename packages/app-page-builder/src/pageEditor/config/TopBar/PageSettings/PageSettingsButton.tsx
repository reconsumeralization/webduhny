import React from "react";
import { IconButton } from "@webiny/ui/Button";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { usePageSettings } from "./usePageSettings";

export const PageSettingsButton = () => {
    const { openSettings } = usePageSettings();

    return <IconButton onClick={openSettings} icon={<SettingsIcon />} />;
};
