import * as React from "react";
import { makeDecoratable } from "~/utils";
import { DrawerClose } from "./DrawerClose";
import { Button, ButtonProps } from "~/Button";

const CancelButtonBase = (props: ButtonProps) => (
    <DrawerClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DrawerClose>
);

export const CancelButton = makeDecoratable("CancelButton", CancelButtonBase);
