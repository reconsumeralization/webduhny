import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { usePage } from "~/admin/views/Pages/hooks/usePage";
import { usePagesPermissions } from "~/hooks/permissions";
import { EditPage } from "./EditPage";

export const SecureEditPage = () => {
    const { page } = usePage();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");
    const { canUpdate: pagesCanUpdate } = usePagesPermissions();

    const { folderId } = page.location;
    const canEdit = useMemo(() => {
        return pagesCanUpdate(page.data.createdBy.id) && canManageContent(folderId);
    }, [canManageContent, folderId]);

    if (!canEdit) {
        return null;
    }

    return <EditPage />;
};
