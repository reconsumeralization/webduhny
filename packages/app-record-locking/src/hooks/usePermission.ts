import { useMemo } from "react";
import { useSecurity } from "@webiny/app-security";

export const usePermission = () => {
    const { identity, getPermission } = useSecurity();

    const canForceUnlock = useMemo(() => {
        const hasFullAccess = !!getPermission("recordLocking.*");
        if (hasFullAccess) {
            return true;
        }
        const permission = getPermission("recordLocking");
        return permission?.canForceUnlock === "yes";
    }, [identity?.permissions]);

    return {
        canForceUnlock
    };
};
