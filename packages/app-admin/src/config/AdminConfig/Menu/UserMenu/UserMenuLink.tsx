import {
    UserMenuLink as BaseUserMenuLink,
    UserMenuLinkIcon as BaseUserMenuLinkIcon
} from "~/base/ui/UserMenu/UserMenuLink";

const UserMenuLink = Object.assign(BaseUserMenuLink, {
    Icon: BaseUserMenuLinkIcon
});

export { UserMenuLink };
