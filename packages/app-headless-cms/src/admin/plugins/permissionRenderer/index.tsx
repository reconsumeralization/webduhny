import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/devices_other.svg";
import { CMSPermissions } from "./CmsPermissions";

const plugin: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-cms",
    render(props) {
        return (
            <Accordion.Item
                icon={
                    <Accordion.Item.Icon
                        icon={<PermissionsIcon />}
                        label={"Headless CMS Permissions"}
                    />
                }
                title={"Headless CMS"}
                description={"Manage Headless CMS app access permissions."}
                data-testid={"permission.cms"}
            >
                <CMSPermissions {...props} />
            </Accordion.Item>
        );
    }
};
export default plugin;
