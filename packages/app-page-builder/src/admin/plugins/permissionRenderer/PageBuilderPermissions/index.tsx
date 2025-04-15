import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/table_chart.svg";
import { PageBuilderPermissions } from "./PageBuilderPermissions";
import { i18n } from "@webiny/app/i18n";

const t = i18n.ns("app-page-builder/admin/plugins/permissionRenderer");

const plugin: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-page-builder",
    render(props) {
        return (
            <Accordion.Item
                icon={
                    <Accordion.Item.Icon
                        icon={<PermissionsIcon />}
                        label={"Page Builder Permissions"}
                    />
                }
                title={t`Page Builder`}
                description={t`Manage Page Builder app access permissions.`}
                data-testid={"permission.pb"}
            >
                <PageBuilderPermissions {...props} />
            </Accordion.Item>
        );
    }
};
export default plugin;
