import React from "react";
import { OptionsMenu } from "@webiny/app-admin";
import { cn } from "@webiny/admin-ui";
import { useAcoConfig } from "~/config";
import { useFolder } from "~/hooks";

export const MenuActions = () => {
    const { folder } = useFolder();
    const { folder: folderConfig } = useAcoConfig();

    // If the user cannot manage folder structure, no need to show the menu.
    if (!folder.canManageStructure) {
        return null;
    }

    return (
        <div
            className={cn([
                "wby-absolute wby-right-0 wby-right-0",
                "wby-invisible group-hover:wby-visible",
                "wby-cursor-pointer0"
            ])}
        >
            <OptionsMenu actions={folderConfig.actions} data-testid={"folder.tree.menu-action"} />
        </div>
    );
};
