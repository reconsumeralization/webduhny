import React from "react";
import { AccordionItem } from "@webiny/ui/Accordion";
import { ReactComponent as SecurityIcon } from "@webiny/icons/security.svg";
import { AdminUsersPermissions } from "./AdminUsersPermissions";
import { PermissionRendererPlugin } from "@webiny/app-admin/plugins/PermissionRendererPlugin";

export default new PermissionRendererPlugin({
    render(props) {
        return (
            <AccordionItem
                icon={<SecurityIcon />}
                title={`Admin Users`}
                description={`Manage Admin Users access permissions.`}
                data-testid={"permission.adminUsers"}
            >
                <AdminUsersPermissions {...props} />
            </AccordionItem>
        );
    }
});
