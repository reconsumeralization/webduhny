import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { observer } from "mobx-react-lite";
import { PageListConfig } from "~/admin/config/pages";
import { usePagesPermissions } from "~/hooks/permissions";
import { ActionDuplicate } from "~/admin/components/BulkActions/ActionDuplicate";

export const SecureActionDuplicate = ActionDuplicate.createDecorator(Original => {
    return observer(() => {
        const { canWrite: pagesCanWrite } = usePagesPermissions();
        const { getFolderLevelPermission: canManageContent } =
            useGetFolderLevelPermission("canManageContent");

        const { useWorker } = PageListConfig.Browser.BulkAction;
        const worker = useWorker();

        const canDuplicateAll = useMemo(() => {
            return worker.items.every(item => {
                return (
                    pagesCanWrite(item.data.createdBy.id) &&
                    canManageContent(item.location?.folderId)
                );
            });
        }, [worker.items, canManageContent]);

        if (!canDuplicateAll) {
            console.log("You don't have permissions to duplicate pages.");
            return null;
        }

        return <Original />;
    });
});
