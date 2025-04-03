import React from "react";
import { ReactComponent as VisibilityOff } from "@webiny/icons/visibility_off.svg";
import { Heading, Icon, Text } from "@webiny/admin-ui";

export const MissingPermissionsWidget = () => {
    return (
        <div className="wby-w-full wby-h-full wby-flex wby-flex-col wby-items-center wby-justify-center wby-text-center wby-bg-neutral-light wby-rounded-xl wby-px-xxl wby-py-lg wby-gap-sm">
            <div>
                <Icon
                    icon={<VisibilityOff />}
                    label={"Access permission required"}
                    color={"accent"}
                    size={"lg"}
                />
            </div>
            <Heading level={4}>{"Access permission required"}</Heading>
            <Text>
                {
                    "It seems you do not have access to Webiny apps. Please contact the administrator to set up your Webiny account."
                }
            </Text>
        </div>
    );
};
