import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import { EditRevisionMenuOption, EditRevisionMenuOptionProps } from "./EditRevisionMenuOption";

export const SecureEditRevisionMenuOption = (props: EditRevisionMenuOptionProps) => {
    const { page } = props;
    const { canUpdate: pagesCanUpdate } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return (
            pagesCanUpdate(page?.createdBy?.id) && canManageContent(page.wbyAco_location?.folderId)
        );
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <EditRevisionMenuOption {...props} />;
};
