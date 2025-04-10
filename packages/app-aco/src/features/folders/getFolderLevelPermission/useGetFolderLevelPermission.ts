import { useCallback } from "react";
import { useWcp } from "@webiny/app-wcp";
import { GetFolderLevelPermission } from "./GetFolderLevelPermission";
import { FolderPermissionName } from "./FolderPermissionName";
import { useFoldersType } from "~/hooks";

export const useGetFolderLevelPermission = (permissionName: FolderPermissionName) => {
    const type = useFoldersType();
    const wcp = useWcp();

    const getFolderLevelPermission = useCallback(
        (id: string) => {
            const instance = GetFolderLevelPermission.getInstance(
                type,
                permissionName,
                wcp.canUseFolderLevelPermissions()
            );
            return instance.execute({ id });
        },
        [type, wcp]
    );

    return {
        getFolderLevelPermission
    };
};
