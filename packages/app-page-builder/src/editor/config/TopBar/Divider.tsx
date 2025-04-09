import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Separator } from "@webiny/admin-ui";

export const Divider = makeDecoratable("TopBarDivider", () => {
    return <Separator orientation={"vertical"}  />;
});
