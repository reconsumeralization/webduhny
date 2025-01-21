import * as React from "react";
import { makeDecoratable } from "~/utils";
import { DialogClose } from "./DialogClose";
import { Button, ButtonProps } from "~/Button";

const CancelButtonBase = (props: ButtonProps) => (
    <DialogClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DialogClose>
);

export const CancelButton = makeDecoratable("CancelButton", CancelButtonBase);
