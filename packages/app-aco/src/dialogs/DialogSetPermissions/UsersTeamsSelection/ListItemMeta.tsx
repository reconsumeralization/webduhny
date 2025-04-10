import React, { useMemo } from "react";
import { ReactComponent as More } from "@webiny/icons/arrow_drop_down.svg";
import { Button, DropdownMenu, Text, Tooltip } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { FolderAccessLevel, FolderLevelPermissionsTarget, FolderPermission } from "~/types";

const TARGET_LEVELS = [
    {
        id: "viewer",
        label: "Viewer",
        description: "Can view content, but not modify it"
    },
    {
        id: "editor",
        label: "Editor",
        description: "Can view and modify content"
    },
    {
        id: "owner",
        label: "Owner",
        description: "Can edit and manage content permissions"
    }
];

interface ListItemMetaProps {
    permission: FolderPermission;
    target: FolderLevelPermissionsTarget;
    targetsList: FolderLevelPermissionsTarget[];
    onRemoveAccess: (params: { permission: FolderPermission }) => void;
    onUpdatePermission: (params: { permission: FolderPermission }) => void;
}

export const ListItemMeta = ({
    permission,
    target,
    targetsList,
    onRemoveAccess,
    onUpdatePermission
}: ListItemMetaProps) => {
    const { identity } = useSecurity();

    const currentLevel = useMemo(() => {
        return TARGET_LEVELS.find(level => level.id === permission.level)!;
    }, [permission.level]);

    const disabledReason = useMemo(() => {
        if (permission.inheritedFrom?.startsWith("parent:")) {
            return "Inherited from parent folder.";
        }

        if (identity!.id === target.id) {
            let message = "You can't change your own permissions.";
            if (permission.inheritedFrom?.startsWith("team:")) {
                const team = targetsList.find(t => t.target === permission.inheritedFrom);
                message += " Access to this folder is managed by a team";
                if (team) {
                    message += ` (${team.name})`;
                }
                message += ".";
            }
            return message;
        }

        return null;
    }, [permission]);

    const handle = useMemo(() => {
        let handle = (
            <Button
                variant={"ghost"}
                disabled={!!disabledReason}
                text={currentLevel.label}
                icon={<More />}
                iconPosition={"end"}
            />
        );

        if (disabledReason) {
            handle = <Tooltip content={disabledReason} trigger={handle} />;
        }

        return handle;
    }, [disabledReason, currentLevel.label]);

    return (
        <DropdownMenu
            trigger={handle}
            // This is needed because the z-index value is set in `packages/app-admin/src/components/Dialogs/styled.tsx`
            // portalZIndex={101}
        >
            {TARGET_LEVELS.map(level => (
                <DropdownMenu.CheckboxItem
                    key={level.id}
                    checked={currentLevel.id === level.id}
                    text={
                        <div>
                            <Text as={"div"}>{level.label}</Text>
                            <Text as={"div"} size={"sm"} className={"wby-text-neutral-strong"}>
                                {level.description}
                            </Text>
                        </div>
                    }
                    onClick={() => {
                        // Needed to do this with a short delay because of a visual glitch.
                        setTimeout(() => {
                            onUpdatePermission({
                                permission: {
                                    ...permission,
                                    level: level.id as FolderAccessLevel
                                }
                            });
                        }, 75);
                    }}
                />
            ))}
            <DropdownMenu.Separator />
            <DropdownMenu.Item
                onClick={() => onRemoveAccess({ permission })}
                text={"Remove access"}
            />
        </DropdownMenu>
    );
};
