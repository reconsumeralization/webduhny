import React from "react";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";
import { IconButton, type IconButtonProps } from "~/Button";
import { Icon } from "~/Icon";

type ToastCloseProps = IconButtonProps;

const ToastClose = (props: ToastCloseProps) => (
    <IconButton
        icon={<Icon label={"Close"} icon={<CloseIcon />} />}
        size={"sm"}
        iconSize={"lg"}
        {...props}
    />
);

export { ToastClose, type ToastCloseProps };
