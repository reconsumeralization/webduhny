import React from "react";
import { AdminConfig } from "~/config/AdminConfig";

const { useAdminConfig } = AdminConfig;

export const SupportMenuItems = () => {
    const { supportMenus } = useAdminConfig();
    return supportMenus.map(menu => {
        if (!React.isValidElement(menu.element)) {
            return null;
        }

        return React.cloneElement(menu.element, { key: menu.name });
    });
};
