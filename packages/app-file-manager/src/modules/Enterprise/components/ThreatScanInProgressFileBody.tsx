import React from "react";
import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as ScanIcon } from "@webiny/icons/policy.svg";

export const ThreatScanInProgressFileBody = () => {
    return (
        <div
            style={{ height: 150 }}
            className={"wby-flex wby-items-center wby-justify-center wby-bg-neutral-muted"}
        >
            <div className={"wby-flex wby-flex-col wby-items-center wby-gap-md"}>
                <Icon
                    icon={<ScanIcon />}
                    label={"Scanning for threats..."}
                    size={"lg"}
                    color={"neutral-light"}
                />
                <Text size={"sm"} className={"wby-text-neutral-strong"}>
                    Scanning for threats...
                </Text>
            </div>
        </div>
    );
};
