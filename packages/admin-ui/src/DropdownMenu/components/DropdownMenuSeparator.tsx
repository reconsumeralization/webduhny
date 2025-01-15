import * as React from "react";
import { Separator, type SeparatorProps } from "~/Separator";
import { makeDecoratable } from "~/utils";

const DropdownMenuSeparatorBase = (props: SeparatorProps) => {
    return <Separator variant={"strong"} margin={"md"} {...props} />;
};

export const DropdownMenuSeparator = makeDecoratable(
    "DropdownMenuSeparator",
    DropdownMenuSeparatorBase
);
