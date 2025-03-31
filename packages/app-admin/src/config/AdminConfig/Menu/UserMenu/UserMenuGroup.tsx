import {
    UserMenuItem as BaseUserMenuItem,
    UserMenuItemAction as BaseUserMenuItemAction,
    UserMenuItemIcon as BaseUserMenuItemIcon
} from "~/base/ui/UserMenu/UserMenuItem";

const UserMenuGroup = Object.assign(BaseUserMenuItem, {
    Action: BaseUserMenuItemAction,
    Icon: BaseUserMenuItemIcon
});

export { UserMenuGroup };
