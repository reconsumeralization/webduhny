import React from "react";
import { css } from "emotion";
import { Label } from "@webiny/admin-ui";

export const gridNoPaddingClass = css({
    padding: "0px !important"
});

export const gridWithPaddingClass = css({
    paddingTop: "var(--padding-md)"
});

interface PermissionInfoProps {
    title: string;
}
export const PermissionInfo = ({ title }: PermissionInfoProps) => (
    <div className={"wby-flex wby-items-center wby-h-full"}>
        <Label text={title} />
    </div>
);
