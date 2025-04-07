import React, { ReactElement } from "react";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as FileIcon } from "@webiny/icons/description.svg";

export interface EmptyViewProps {
    icon?: ReactElement;
    title: string;
    action?: ReactElement | null;
}
const EmptyView = ({ icon = <FileIcon />, title, action }: EmptyViewProps) => {
    return (
        <div className="wby-w-full wby-h-full wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-md">
            <div className="wby-flex wby-justify-center">
                <div
                    style={{ width: 128, height: 128 }}
                    className="wby-flex wby-justify-center wby-items-center wby-bg-neutral-dimmed wby-rounded-full wby-fill-neutral-strong [&_svg]:wby-size-[48px]"
                >
                    <Icon icon={icon} label={"Empty"} />
                </div>
            </div>
            <Text
                size={"md"}
                className={"wby-text-center wby-text-neutral-strong"}
                as={"div"}
                style={{ maxWidth: 276 }}
            >
                {title}
            </Text>
            {action && <div className={"wby-flex wby-justify-center wby-gap-sm"}>{action}</div>}
        </div>
    );
};

export default EmptyView;
