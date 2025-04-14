import React, { useEffect } from "react";
import { Accordion } from "@webiny/admin-ui";
import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as PermissionsIcon } from "@webiny/icons/account_tree.svg";
import { ApwPermissions as ApwPermissionsComponent } from "./ApwPermissions";
import { plugins } from "@webiny/plugins";

const createPermissions = (): AdminAppPermissionRendererPlugin => {
    return {
        type: "admin-app-permissions-renderer",
        name: "admin-app-permissions-renderer-apw",
        render(props) {
            return (
                <Accordion.Item
                    icon={
                        <Accordion.Item.Icon
                            icon={<PermissionsIcon />}
                            label={"Advanced Publishing Workflow Permissions"}
                        />
                    }
                    title={"Advanced Publishing Workflow"}
                    description={"Manage Advanced Publishing Workflow app access permissions."}
                    data-testid={"permission.apw"}
                >
                    <ApwPermissionsComponent {...props} />
                </Accordion.Item>
            );
        }
    };
};

export const ApwPermissions = () => {
    useEffect(() => {
        plugins.register(createPermissions());
    }, []);
    return null;
};
