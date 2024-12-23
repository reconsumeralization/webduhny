import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";

type DialogHeaderProps = Pick<DialogProps, "title" | "description">;

const DialogHeaderBase = React.forwardRef<any, DialogHeaderProps>(({ title, description }, ref) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div
            className={cn("flex flex-col gap-y-xxs mb-lg text-center sm:text-left text-neutral-primary")}
            ref={ref}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
        </div>
    );
});

DialogHeaderBase.displayName = "DialogHeader";

export const DialogHeader = DialogHeaderBase;
