import React, { useCallback, useState } from "react";
import { useSecurity } from "@webiny/app-security";
import { SettingsDialog } from "./CurrentTenant/SettingsDialog";
import { Button } from "@webiny/admin-ui";
import { makeDecoratable } from "@webiny/app-admin";

export const CurrentTenant = makeDecoratable("CurrentTenantWidget", () => {
    const { identity } = useSecurity();
    const [settingsShown, showSettings] = useState(false);

    const { currentTenant, defaultTenant } = identity || {
        currentTenant: null,
        defaultTenant: null
    };

    const currentTenantId = currentTenant ? currentTenant.id : "unknown";
    const defaultTenantId = defaultTenant ? defaultTenant.id : "unknown";

    const closeDialog = useCallback(() => showSettings(false), []);

    if (currentTenantId === "root") {
        return (
            <>
                <SettingsDialog open={settingsShown} onClose={closeDialog} />
                <Button
                    variant={"ghost"}
                    size={"md"}
                    text={"Root tenant"}
                    onClick={() => showSettings(true)}
                />
            </>
        );
    }

    if (currentTenantId !== "root" && currentTenantId !== defaultTenantId) {
        return (
            <Button
                disabled
                variant={"ghost"}
                size={"md"}
                text={currentTenant.name}
                onClick={() => showSettings(true)}
            />
        );
    }

    return null;
});
