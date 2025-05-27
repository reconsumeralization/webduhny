import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { PermissionRendererPlugin } from "@webiny/app-admin/plugins/PermissionRendererPlugin";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/translate.svg";
import { I18NPermissions } from "./I18NPermissions";

const t = i18n.ns("app-i18n/admin/plugins/permissionRenderer");

export default new PermissionRendererPlugin({
    render(props) {
        return (
            <Accordion.Item
                icon={<Accordion.Item.Icon icon={<PermissionsIcon />} label={"I18N Permissions"} />}
                title={t`I18N`}
                description={t`Manage I18N app access permissions.`}
                data-testid={"permission.i18n"}
            >
                <I18NPermissions {...props} />
            </Accordion.Item>
        );
    }
});
