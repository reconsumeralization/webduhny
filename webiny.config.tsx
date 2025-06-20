import React from "react";
import { Admin } from "@webiny/extensions";

export default function Webiny() {
    return (
        <>
            <Admin name="customDashboard" src={"./extensions/ChangeLogo.tsx"} />
        </>
    );
}
