import React, { useMemo } from "react";
import { ListActions, ListItemMeta as UiListItemMeta } from "@webiny/ui/List";
import { Menu, MenuDivider, MenuItem } from "@webiny/ui/Menu";
import { ReactComponent as More } from "@material-design-icons/svg/outlined/arrow_drop_down.svg";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { Typography } from "@webiny/ui/Typography";
import styled from "@emotion/styled";
import { useSecurity } from "@webiny/app-security";
import { Tooltip } from "@webiny/ui/Tooltip";
import { FolderAccessLevel, FolderLevelPermissionsTarget, FolderPermission } from "~/types";

const TARGET_LEVELS = [
    {
        id: "no-access",
        label: "No Access",
        description: "Cannot view or modify content"
    },
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

const StyledHandle = styled.div<{ disabled: boolean }>`
    display: flex;
    color: var(--mdc-theme-text-primary-on-background);
    cursor: pointer;
    padding: 20px 0 20px 20px;
    ${({ disabled }) => disabled && `opacity: 0.5; pointer-events: none;`}
`;

const StyledMenuItem = styled(MenuItem)`
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;

    div.selected {
        margin-right: 15px;
        width: 20px;
        height: 20px;

        svg {
            fill: var(--mdc-theme-primary);
        }
    }

    div.info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

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

    const { isDisabled, tooltipMessage } = useMemo(() => {
        let message = null;
        let disabled = false;

        if (permission.inheritedFrom?.startsWith("parent:")) {
            message = "Inherited from parent folder.";
            disabled = false; // Still allow interaction, just inform user
        }

        if (identity!.id === target.id) {
            message = "You can't change your own permissions.";
            if (permission.inheritedFrom?.startsWith("team:")) {
                const team = targetsList.find(t => t.target === permission.inheritedFrom);
                message += " Access to this folder is managed by a team";
                if (team) {
                    message += ` (${team.name})`;
                }
                message += ".";
            }
            disabled = true;
        }

        return { isDisabled: disabled, tooltipMessage: message };
    }, [permission, identity, target, targetsList]);

    const handle = useMemo(() => {
        let handle = (
            <StyledHandle disabled={isDisabled}>
                <Typography use="body1">{currentLevel.label}</Typography>
                <More />
            </StyledHandle>
        );

        if (tooltipMessage) {
            handle = <Tooltip content={tooltipMessage}>{handle}</Tooltip>;
        }

        return handle;
    }, [tooltipMessage, isDisabled, currentLevel.label]);

    return (
        <UiListItemMeta>
            <ListActions>
                <Menu
                    handle={handle}
                    disabled={isDisabled}
                    // Should prevent first item from being autofocused, but it doesn't. 🤷‍
                    focusOnOpen={false}
                    // This is needed because the z-index value is set in `packages/app-admin/src/components/Dialogs/styled.tsx`
                    portalZIndex={101}
                >
                    {TARGET_LEVELS.map(level => (
                        <StyledMenuItem
                            key={level.id}
                            onClick={() => {
                                // Needed to do this with a short delay because of a visual glitch.
                                setTimeout(() => {
                                    onUpdatePermission({
                                        permission: {
                                            ...permission,
                                            inheritedFrom: undefined, // Reset inherited permissions to allow user-defined changes
                                            level: level.id as FolderAccessLevel
                                        }
                                    });
                                }, 75);
                            }}
                        >
                            <div className="selected">
                                {currentLevel.id === level.id && <Check />}
                            </div>
                            <div className="info">
                                <Typography use="body1">{level.label}</Typography>
                                <Typography use="caption">{level.description}</Typography>
                            </div>
                        </StyledMenuItem>
                    ))}
                    <MenuDivider />
                    <MenuItem onClick={() => onRemoveAccess({ permission })}>
                        Remove access
                    </MenuItem>
                </Menu>
            </ListActions>
        </UiListItemMeta>
    );
};
