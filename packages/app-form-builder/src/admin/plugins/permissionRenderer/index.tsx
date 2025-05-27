import React from "react";
import { i18n } from "@webiny/app/i18n";
import { Accordion } from "@webiny/admin-ui";
import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/check_box.svg";
import { FormBuilderPermissions } from "./FormBuilderPermissions";

const t = i18n.ns("app-form-builder/admin/plugins/permissionRenderer");

const plugin: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-form-builder",
    render(props) {
        return (
            <Accordion.Item
                icon={
                    <Accordion.Item.Icon
                        icon={<PermissionsIcon />}
                        label={"Form Builder Permissions"}
                    />
                }
                title={t`Form Builder`}
                description={t`Manage Form Builder app access permissions.`}
                data-testid={"permission.fb"}
            >
                <FormBuilderPermissions {...props} />
            </Accordion.Item>
        );
    }
};
export default () => plugin;
