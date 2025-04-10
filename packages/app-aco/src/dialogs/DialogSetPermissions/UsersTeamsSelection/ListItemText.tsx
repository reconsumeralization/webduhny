import React from "react";
import { Text } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { FolderLevelPermissionsTarget } from "~/types";

interface ListItemTextProps {
    target: FolderLevelPermissionsTarget;
}

export const ListItemText = ({ target }: ListItemTextProps) => {
    const { identity } = useSecurity();

    if (target.type === "admin") {
        return (
            <div>
                <Text as="div">
                    {target.name}&nbsp;
                    {target.id === identity!.id && <em>(you)</em>}
                </Text>
                <Text as={"div"} size={"sm"} className={"wby-text-neutral-strong wby-font-normal"}>
                    {target.meta.email || "E-mail not available."}
                </Text>
            </div>
        );
    }

    return <>{target.name}</>;
};
