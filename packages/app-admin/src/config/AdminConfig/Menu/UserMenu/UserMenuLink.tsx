import {
    UserMenuLink as BaseUserMenuLink,
    UserMenuLinkAction as BaseUserMenuLinkAction,
    UserMenuLinkIcon as BaseUserMenuLinkIcon
} from "~/base/ui/UserMenu/UserMenuLink";

const UserMenuLink = Object.assign(BaseUserMenuLink, {
    Action: BaseUserMenuLinkAction,
    Icon: BaseUserMenuLinkIcon
});

export { UserMenuLink };
