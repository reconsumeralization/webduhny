import React from "react";
import { OverlayLoader } from "@webiny/admin-ui";

export const Loader = () => {
    return (
        <div style={{ height: "180px" }} className={"wby-relative"}>
            <OverlayLoader size={"md"} text={"Loading entries..."} />
        </div>
    );
};
