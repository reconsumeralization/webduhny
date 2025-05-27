import React from "react";
import { ReactComponent as SettingsIcon } from "@webiny/icons/tune.svg";
import { Text } from "@webiny/admin-ui";

export const Empty = () => {
    return (
        <div className="wby-py-xl">
            <div className="wby-w-full wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-md">
                <div className="wby-flex wby-justify-center">
                    <div className="wby-flex wby-justify-center wby-items-center wby-size-[72px] wby-bg-neutral-dimmed wby-rounded-full wby-fill-neutral-strong [&_svg]:wby-size-[32px]">
                        <SettingsIcon />
                    </div>
                </div>
                <Text size={"md"} className={"wby-text-center"} as={"div"}>
                    {"No filters found."}
                </Text>
            </div>
        </div>
    );
};
