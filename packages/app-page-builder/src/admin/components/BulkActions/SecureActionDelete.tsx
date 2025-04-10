import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { observer } from "mobx-react-lite";
import { PageListConfig } from "~/admin/config/pages";
import { usePagesPermissions } from "~/hooks/permissions";
import { ActionDelete as ActionDeleteBase } from "~/admin/components/BulkActions";

export const SecureActionDelete = observer(() => {
    const { canDelete } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const { useWorker } = PageListConfig.Browser.BulkAction;
    const worker = useWorker();

    const canDeleteAll = useMemo(() => {
        return worker.items.every(item => {
            return canDelete(item.data.createdBy.id) && canManageContent(item.location?.folderId);
        });
    }, [worker.items, canManageContent]);

    if (!canDeleteAll) {
        console.log("You don't have permissions to delete pages.");
        return null;
    }

    return <ActionDeleteBase />;
});
