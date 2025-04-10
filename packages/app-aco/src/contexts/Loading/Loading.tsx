import React from "react";
import { OverlayLoader } from "@webiny/admin-ui";

export const Loading = () => {
    return (
        <div className={"wby-w-screen wby-h-screen wby-fixed wby-top-0 wby-left-0 wby-z-50"}>
            <OverlayLoader />
        </div>
    );
};
