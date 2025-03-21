import React from "react";
import get from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    LIST_MENU_CONTENT_GROUPS_MODELS,
    ListMenuCmsGroupsQueryResponse
} from "~/admin/viewsGraphql";
import useQuery from "~/admin/hooks/useQuery";
import usePermission from "~/admin/hooks/usePermission";
import { CmsGroup, CmsModel } from "~/types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

interface HasContentEntryPermissionsProps {
    group: CmsGroup;
    contentModel?: CmsModel;
    children: JSX.Element;
}

const HasContentEntryPermissions = ({
    group,
    contentModel,
    children
}: HasContentEntryPermissionsProps) => {
    const { canReadEntries } = usePermission();

    if (contentModel) {
        if (!canReadEntries({ contentModelGroup: group, contentModel })) {
            return null;
        }
    } else {
        const hasContentEntryPermission = group.contentModels.some(contentModel =>
            canReadEntries({
                contentModelGroup: group,
                contentModel
            })
        );

        if (group.contentModels.length > 0 && !hasContentEntryPermission) {
            return null;
        }
    }

    return children;
};

interface IconProps {
    group: CmsGroup;
}

const Icon = ({ group }: IconProps) => {
    return (
        <FontAwesomeIcon
            style={{ color: "var(--mdc-theme-text-secondary-on-background)" }}
            icon={(group.icon || "").split("/") as IconProp}
        />
    );
};

export const ContentGroupsMenuItems = () => {
    const response = useQuery<ListMenuCmsGroupsQueryResponse>(LIST_MENU_CONTENT_GROUPS_MODELS);
    const groups: CmsGroup[] = get(response, "data.listContentModelGroups.data") || [];

    if (!groups || groups.length === 0) {
        return null;
    }

    return (
        <>
            {groups.map(group => {
                return (
                    <HasContentEntryPermissions key={group.id} group={group}>
                        <>
                            <Menu
                                name={group.id}
                                parent={"headlessCMS"}
                                element={
                                    <Menu.Group
                                        text={group.name}
                                        icon={
                                            <Menu.Group.Icon
                                                label={group.name}
                                                element={<Icon group={group} />}
                                            />
                                        }
                                    />
                                }
                            />

                            {group.contentModels.length === 0 && (
                                <Menu
                                    parent={"headlessCMS"}
                                    name={`${group.id}-empty`}
                                    element={<Menu.Group text={"Nothing to show"} />}
                                />
                            )}
                            {group.contentModels.length > 0 &&
                                group.contentModels.map(contentModel => (
                                    <HasContentEntryPermissions
                                        key={contentModel.modelId}
                                        group={group}
                                        contentModel={contentModel}
                                    >
                                        <Menu
                                            parent={"headlessCMS"}
                                            name={contentModel.modelId}
                                            element={
                                                <Menu.Link
                                                    text={contentModel.name}
                                                    to={`/cms/content-entries/${contentModel.modelId}`}
                                                />
                                            }
                                        />
                                    </HasContentEntryPermissions>
                                ))}
                        </>
                    </HasContentEntryPermissions>
                );
            })}
        </>
    );
};
