import {
    UserMenuItem as BaseUserMenuItem,
    UserMenuItemAction as BaseUserMenuItemAction,
    UserMenuItemIcon as BaseUserMenuItemIcon
} from "~/base/ui/UserMenu/UserMenuItem";

const UserMenuItem = Object.assign(BaseUserMenuItem, {
    Action: BaseUserMenuItemAction,
    Icon: BaseUserMenuItemIcon
});

export { UserMenuItem };
