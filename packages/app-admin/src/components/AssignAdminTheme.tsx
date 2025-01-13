import { AdminConfig } from "~/config/AdminConfig";

export const AssignAdminTheme = () => {
    const opa = AdminConfig.use();
    console.log('themes', opa)
    return null;
};

