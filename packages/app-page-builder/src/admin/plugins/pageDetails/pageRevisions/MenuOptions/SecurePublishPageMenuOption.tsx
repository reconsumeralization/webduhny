import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import { PublishPageMenuOptionProps, PublishPageMenuOption } from "./PublishPageMenuOption";
import { usePage } from "~/admin/views/Pages/PageDetails";

export const SecurePublishPageMenuOption = (props: PublishPageMenuOptionProps) => {
    const { page } = usePage();
    const { canPublish: pagesCanPublish } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return pagesCanPublish() && canManageContent(page.wbyAco_location?.folderId);
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <PublishPageMenuOption {...props} />;
};
