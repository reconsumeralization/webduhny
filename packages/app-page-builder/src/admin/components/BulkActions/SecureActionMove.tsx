import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { observer } from "mobx-react-lite";
import { PageListConfig } from "~/admin/config/pages";
import { ActionMove as ActionMoveBase } from "~/admin/components/BulkActions";

export const SecureActionMove = observer(() => {
    const { useWorker } = PageListConfig.Browser.BulkAction;
    const worker = useWorker();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const canMoveAll = useMemo(() => {
        return worker.items.every(item => {
            return canManageContent(item.location?.folderId);
        });
    }, [worker.items, canManageContent]);

    if (!canMoveAll) {
        return null;
    }

    return <ActionMoveBase />;
});
