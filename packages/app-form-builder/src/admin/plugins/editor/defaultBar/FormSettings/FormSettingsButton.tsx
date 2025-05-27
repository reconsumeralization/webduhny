import React, { useState, useCallback } from "react";
import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import FormSettings from "./FormSettings";

const FormSettingsButton = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const open = useCallback((): void => setOpened(true), []);
    const close = useCallback((): void => setOpened(false), []);

    return (
        <>
            <IconButton variant={"ghost"} onClick={open} icon={<SettingsIcon />} />
            {opened && <FormSettings onExited={close} />}
        </>
    );
};

export default FormSettingsButton;
