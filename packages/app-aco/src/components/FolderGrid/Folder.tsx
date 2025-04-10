import React from "react";
import { cn, Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as FolderIcon } from "@webiny/icons/folder.svg";
import { ReactComponent as FolderSharedIcon } from "@webiny/icons/folder_shared.svg";
import { OptionsMenu } from "@webiny/app-admin";

import { useFolder } from "~/hooks";
import { useAcoConfig } from "~/config";

export interface FolderProps {
    onClick: (id: string) => void;
}

export const Folder = ({ onClick }: FolderProps) => {
    const { folder } = useFolder();
    const { folder: folderConfig } = useAcoConfig();
    const { id, title, hasNonInheritedPermissions, canManagePermissions, canManageStructure } =
        folder;

    let icon = <FolderIcon />;
    if (hasNonInheritedPermissions && canManagePermissions) {
        icon = <FolderSharedIcon />;
    }

    return (
        <div
            className={cn([
                "wby-flex wby-items-center wby-justify-between wby-gap-sm",
                "wby-bg-neutral-base",
                "wby-py-sm-extra wby-px-md",
                "wby-border wby-border-neutral-dimmed wby-border-solid wby-rounded-xs",
                "wby-cursor-pointer"
            ])}
        >
            <div
                className={"wby-flex wby-items-center wby-overflow-hidden wby-gap-sm wby-w-full"}
                onClick={() => onClick(id)}
            >
                <Icon icon={icon} label={"Folder"} size={"md"} color={"neutral-light"} />
                <Text as={"div"} size={"md"} className={"wby-flex-1 wby-truncate"}>
                    {title}
                </Text>
            </div>
            {canManageStructure && (
                <OptionsMenu
                    actions={folderConfig.actions}
                    data-testid={"folder.grid.menu-action"}
                />
            )}
        </div>
    );
};
