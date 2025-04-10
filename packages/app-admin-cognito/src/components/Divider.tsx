import React from "react";
import { Separator, Text } from "@webiny/admin-ui";

export const Divider = () => {
    return (
        <div className={"wby-relative wby-my-lg"}>
            <div className={"wby-absolute wby-inset-0 wby-flex wby-items-center"}>
                <Separator margin={"none"} />
            </div>
            <div className={"wby-relative wby-flex wby-justify-center"}>
                <Text
                    size={"sm"}
                    className={
                        "wby-text-neutral-strong wby-px-sm wby-bg-neutral-base wby-uppercase"
                    }
                >
                    {"Or continue with"}
                </Text>
            </div>
        </div>
    );
};
