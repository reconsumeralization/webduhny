import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/folder_open.svg";
import { FileManagerPermissions } from "./FileManagerPermissions";
import { i18n } from "@webiny/app/i18n";

const t = i18n.ns("app-file-manager/admin/plugins/permissionRenderer");

export default {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-file-manager",
    render(props) {
        return (
            <Accordion.Item
                icon={
                    <Accordion.Item.Icon
                        icon={<PermissionsIcon />}
                        label={"File Manager Permissions"}
                    />
                }
                title={t`File Manager`}
                description={t`Manage File manager app access permissions.`}
                data-testid={"permission.fm"}
            >
                <FileManagerPermissions {...props} />
            </Accordion.Item>
        );
    }
} as AdminAppPermissionRendererPlugin;
