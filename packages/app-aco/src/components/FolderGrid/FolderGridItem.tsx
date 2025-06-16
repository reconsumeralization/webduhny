import React from "react";
import { cn, IconButton, Text, TimeAgo } from "@webiny/admin-ui";
import { FolderIcon, FolderSharedIcon } from "../FolderIcons";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { OptionsMenu } from "@webiny/app-admin";
import { useAcoConfig } from "~/config";
import { useFolder } from "~/hooks";

export interface FolderProps {
    onClick: (id: string) => void;
}

export const FolderGridItem = ({ onClick }: FolderProps) => {
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
                "wby-group",
                "wby-bg-neutral-base wby-rounded-lg",
                "wby-shadow-sm hover:wby-shadow-lg",
                "wby-border-sm wby-border-solid wby-border-neutral-base hover:wby-border-neutral-dimmed-darker",
                "wby-transition-shadow wby-duration-250 wby-ease-in-out",
                "wby-overflow-hidden",
                "wby-cursor-pointer"
            ])}
            onClick={() => onClick(id)}
        >
            <div style={{ height: 150 }} className={"wby-relative"}>
                <div
                    className={cn([
                        "wby-absolute wby-top-0 wby-left-0",
                        "wby-w-full wby-h-full",
                        "wby-flex wby-items-center wby-justify-center"
                    ])}
                >
                    {icon}
                </div>
                {canManageStructure && (
                    <div
                        className={cn([
                            "wby-invisible group-hover:wby-visible",
                            "wby-flex wby-items-center wby-gap-xxs",
                            "wby-p-xs",
                            "wby-absolute wby-top-xs-plus wby-right-xs-plus"
                        ])}
                    >
                        <OptionsMenu
                            actions={folderConfig.actions}
                            data-testid={"folder.grid.menu-action"}
                            trigger={
                                <IconButton
                                    icon={<MoreVerticalIcon />}
                                    size={"sm"}
                                    variant={"ghost"}
                                />
                            }
                        />
                    </div>
                )}
            </div>
            <div className={"wby-px-md wby-py-sm-extra"} data-testid={"fm-file-wrapper-file-label"}>
                <Text size={"sm"} as={"div"} className={"wby-truncate wby-text-neutral-primary"}>
                    {title}
                </Text>
                <Text size={"sm"} as={"div"} className={"wby-truncate wby-text-neutral-dimmed"}>
                    {"Folder"} / <TimeAgo datetime={folder.createdOn} />
                </Text>
            </div>
        </div>
    );
};
