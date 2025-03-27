import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import { NewRevisionFromCurrent, NewRevisionFromCurrentProps } from "./NewRevisionFromCurrent";

export const SecureNewRevisionFromCurrent = (props: NewRevisionFromCurrentProps) => {
    const { page } = props;
    const { canCreate: pagesCanCreate } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return pagesCanCreate() && canManageContent(page.wbyAco_location?.folderId);
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <NewRevisionFromCurrent {...props} />;
};
