import React from "react";
import { Avatar, IconButton } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { ReactComponent as KeyboardArrowRightIcon } from "@webiny/icons/keyboard_arrow_down.svg";
import { UserMenuHandleRenderer as UserMenuHandleRendererSpec } from "@webiny/app-admin";

export const UserMenuHandle = UserMenuHandleRendererSpec.createDecorator(() => {
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
});
