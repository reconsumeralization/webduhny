import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@webiny/admin-ui";

interface IconProps {
    icon: string | undefined;
}

interface ImageProps {
    title: string;
    src?: string | null;
    width?: number;
    icon: string | undefined;
}

const DisplayIcon = ({ icon }: IconProps) => {
    if (!icon) {
        return null;
    }
    return (
        <Icon
            icon={<FontAwesomeIcon icon={(icon || "").split("/") as IconProp} />}
            label={"Model icon"}
            size={"lg"}
            className={"wby-text-neutral-muted"}
        />
    );
};

export const Image = ({ src, icon, width }: ImageProps) => {
    return (
        <div className={"wby-size-[56px] wby-m-xs wby-rounded-sm wby-overflow-hidden wby-relative"}>
            <div
                className={
                    "wby-size-full wby-flex wby-justify-center wby-items-center wby-bg-neutral-base"
                }
            >
                {src ? <img src={src} width={width} /> : <DisplayIcon icon={icon} />}
            </div>
        </div>
    );
};
