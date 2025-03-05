import React from "react";
import { ReactComponent as NotificationsIconActive } from "@material-design-icons/svg/outlined/notifications_active.svg";
import { Icon as BaseIcon } from "~/Icon";

const NotificationIcon = (
    <BaseIcon
        icon={<NotificationsIconActive />}
        label={"Notification"}
        size={"md"}
        color={"accent"}
    />
);

type IconProps = {
    icon?: React.ReactElement<typeof BaseIcon>;
};

const ToastIcon = ({ icon }: IconProps) => {
    return (
        <span>
            {React.isValidElement(icon)
                ? React.cloneElement(icon, { ...NotificationIcon.props, ...icon.props })
                : React.cloneElement(NotificationIcon)}
        </span>
    );
};

export { ToastIcon, type IconProps };
