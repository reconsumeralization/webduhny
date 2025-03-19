import React, { Fragment } from "react";
import { css } from "emotion";
import {
    Compose,
    UserMenuHandle,
    UserMenuHandleRenderer as UserMenuHandleRendererSpec,
    UserMenuItemRenderer as UserMenuItemRendererSpec,
    UserMenuItems,
    UserMenuRenderer as UserMenuRendererSpec,
    useUserMenu,
    useUserMenuItem
} from "@webiny/app-admin";
import { Avatar, DropdownMenu, IconButton } from "@webiny/admin-ui";
import { Link } from "@webiny/react-router";
import { useSecurity } from "@webiny/app-security";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";

const UserMenuRendererImpl = () => {
    return function UserMenu() {
        const security = useSecurity();
        const { menuItems } = useUserMenu();

        if (!security || !security.identity) {
            return null;
        }

        return (
            <DropdownMenu trigger={<UserMenuHandle />} data-testid={"logged-in-user-menu-list"}>
                <UserMenuItems menuItems={menuItems} />
            </DropdownMenu>
        );
    };
};

const UserMenuHandleRendererImpl = () => {
    return function UserMenuHandle() {
        const { identity } = useSecurity();

        if (!identity) {
            return null;
        }

        const profile = identity.profile;

        const { firstName, lastName, avatar } = profile || {};
        const fullName = `${firstName} ${lastName}`;

        return (
            <div className={"wby-flex wby-gap-x-sm wby-cursor-pointer"}>
                <div
                    data-testid="logged-in-user-menu-avatar"
                    className={
                        "wby-flex wby-items-center wby-rounded-md wby-gap-xxs wby-py-xs wby-px-xs wby-bg-neutral-light"
                    }
                >
                    <Avatar
                        size={"sm"}
                        variant={"strong"}
                        image={<Avatar.Image src={avatar?.src} />}
                        fallback={
                            <Avatar.Fallback className={"wby-uppercase"} delayMs={0}>
                                {fullName[0]}
                            </Avatar.Fallback>
                        }
                    />
                    <IconButton
                        variant={"ghost"}
                        size={"xs"}
                        color={"neutral-strong"}
                        icon={<KeyboardArrowRightIcon />}
                    />
                </div>
            </div>
        );
    };
};

const linkStyles = css({
    "&:hover": {
        textDecoration: "none"
    }
});

const UserMenuItemRendererImpl = () => {
    return function UserMenuItemRenderer() {
        const { label, path, icon, onClick, element } = useUserMenuItem();

        if (element) {
            return element;
        }

        if (path) {
            return (
                <DropdownMenu.Item
                    icon={icon}
                    content={
                        <Link to={path} className={linkStyles}>
                            {label}
                        </Link>
                    }
                />
            );
        }

        return <DropdownMenu.Item onClick={onClick} icon={icon} content={label} />;
    };
};

export const UserMenu = () => {
    return (
        <Fragment>
            <Compose component={UserMenuHandleRendererSpec} with={UserMenuHandleRendererImpl} />
            <Compose component={UserMenuRendererSpec} with={UserMenuRendererImpl} />
            <Compose component={UserMenuItemRendererSpec} with={UserMenuItemRendererImpl} />
        </Fragment>
    );
};
