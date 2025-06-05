import React from "react";
import { Heading, Text } from "@webiny/admin-ui";
import { ReactComponent as VisibilityOffIcon } from "@webiny/icons/visibility_off.svg";

export const NoPermissions = () => {
    return (
        <div
            className={
                "wby-w-full wby-h-full wby-p-lg wby-flex wby-items-center wby-justify-center wby-bg-neutral-base"
            }
        >
            <div className={"wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-sm"}>
                <div className={"wby-fill-neutral-strong"}>
                    <VisibilityOffIcon width={75} height={75} />
                </div>
                <div className={"wby-text-center"}>
                    <Heading level={4} className={"wby-text-neutral-strong"}>
                        {"Permission Required"}
                    </Heading>
                    <Text
                        as={"div"}
                        style={{
                            width: "300px"
                        }}
                        className={"wby-text-neutral-strong"}
                    >
                        {
                            "You don’t have the necessary permissions to access these files. Please contact your administrator for access."
                        }
                    </Text>
                </div>
            </div>
        </div>
    );
};
