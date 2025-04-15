import React from "react";

import { AdminAppPermissionRendererPlugin } from "@webiny/app-admin/types";
import { ReactComponent as LockIcon } from "@webiny/icons/lock.svg";
import { RecordLockingPermissions } from "./RecordLockingPermissions";
import { Accordion } from "@webiny/admin-ui";

export const recordLockingPermissionRenderer: AdminAppPermissionRendererPlugin = {
    type: "admin-app-permissions-renderer",
    name: "admin-app-permissions-renderer-record-locking",
    render(props) {
        return (
            <Accordion.Item
                icon={<Accordion.Item.Icon label={"Record Locking"} icon={<LockIcon />} />}
                title={"Record Locking"}
                description={"Manage Record Locking permissions."}
                data-testid={"permission.recordLocking"}
            >
                <RecordLockingPermissions {...props} />
            </Accordion.Item>
        );
    }
};
