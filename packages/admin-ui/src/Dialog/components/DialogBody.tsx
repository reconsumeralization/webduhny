import * as React from "react";
import { cn } from "~/utils";
import type { DialogProps } from "~/Dialog";

export type DialogBodyProps = Pick<DialogProps, "children" | "bodyPadding">;

export const DialogBody = ({ bodyPadding, children }: DialogBodyProps) => {
    return <div className={cn("py-sm ", { "px-lg": bodyPadding !== false })}>{children}</div>;
};
