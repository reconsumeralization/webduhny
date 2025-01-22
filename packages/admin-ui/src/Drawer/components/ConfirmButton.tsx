import * as React from "react";
import { makeDecoratable } from "~/utils";
import { Button, ButtonProps } from "~/Button";

const ConfirmButtonBase = (props: ButtonProps) => (
    <Button text={"Confirm"} {...props} variant="primary" />
);

export const ConfirmButton = makeDecoratable("ConfirmButton", ConfirmButtonBase);
