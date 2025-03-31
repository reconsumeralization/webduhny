import React from "react";
import { createVoidComponent, makeDecoratable } from "~/index";
import type {
    SidebarMenuGroupActionProps,
    SidebarMenuGroupIconProps,
    SidebarMenuGroupButtonProps
} from "@webiny/admin-ui/Sidebar/components/groups/SidebarMenuGroup";

// UserMenuGroup
type UserMenuGroupRendererProps = SidebarMenuGroupButtonProps;

const UserMenuGroupRenderer = makeDecoratable(
    "UserMenuGroupRenderer",
    createVoidComponent<UserMenuGroupRendererProps>()
);

const UserMenuGroup = makeDecoratable("UserMenuGroup", (props: UserMenuGroupRendererProps) => {
    return <UserMenuGroupRenderer {...props} />;
});

// UserMenuGroup > Action
type UserMenuGroupActionRendererProps = SidebarMenuGroupActionProps;

const UserMenuGroupActionRenderer = makeDecoratable(
    "UserMenuGroupAction",
    createVoidComponent<UserMenuGroupActionRendererProps>()
);

const UserMenuGroupAction = makeDecoratable(
    "UserMenuGroupAction",
    (props: UserMenuGroupActionRendererProps) => {
        return <UserMenuGroupActionRenderer {...props} />;
    }
);

// UserMenuGroup > Icon
type UserMenuGroupIconRendererProps = SidebarMenuGroupIconProps;

const UserMenuGroupIconRenderer = makeDecoratable(
    "UserMenuGroupIcon",
    createVoidComponent<UserMenuGroupIconRendererProps>()
);

const UserMenuGroupIcon = makeDecoratable(
    "UserMenuGroupIcon",
    (props: UserMenuGroupIconRendererProps) => {
        return <UserMenuGroupIconRenderer {...props} />;
    }
);

export {
    UserMenuGroup,
    UserMenuGroupRenderer,
    UserMenuGroupAction,
    UserMenuGroupActionRenderer,
    UserMenuGroupIcon,
    UserMenuGroupIconRenderer,
    type UserMenuGroupRendererProps,
    type UserMenuGroupActionRendererProps,
    type UserMenuGroupIconRendererProps
};
