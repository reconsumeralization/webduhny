import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { usePage } from "~/admin/views/Pages/hooks/usePage";
import { MovePage } from "./MovePage";

export const SecureMovePage = () => {
    const { page } = usePage();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const { folderId } = page.location;
    const canMove = useMemo(() => {
        return canManageContent(folderId);
    }, [canManageContent, folderId]);

    if (!canMove) {
        return null;
    }

    return <MovePage />;
};
