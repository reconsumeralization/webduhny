import React from "react";
import { ReactComponent as DraftIcon } from "@webiny/icons/draw.svg";
import { ReactComponent as PublishedIcon } from "@webiny/icons/visibility.svg";
import { ReactComponent as UnpublishedIcon } from "@webiny/icons/visibility_off.svg";
import { Box } from "./Box";
import { CmsContentEntryStatusType } from "~/types";
import { Icon } from "@webiny/admin-ui";

const getIcon = (status: CmsContentEntryStatusType) => {
    switch (status) {
        case "published":
            return (
                <Icon
                    icon={<PublishedIcon />}
                    label="Published"
                    size={"lg"}
                    className={"wby-fill-success-default"}
                />
            );
        case "unpublished":
            return (
                <Icon
                    icon={<UnpublishedIcon />}
                    label="Unpublished"
                    size={"lg"}
                    className={"wby-fill-danger-default"}
                />
            );
        case "draft":
            return (
                <Icon
                    icon={<DraftIcon />}
                    label="Draft"
                    size={"lg"}
                    className={"wby-fill-warning-default"}
                />
            );
        default:
            return null;
    }
};

interface StatusProps {
    status: CmsContentEntryStatusType;
}
export const Status = ({ status }: StatusProps) => {
    return (
        <Box icon={getIcon(status)} name={"Status"}>
            {status.toUpperCase()}
        </Box>
    );
};
