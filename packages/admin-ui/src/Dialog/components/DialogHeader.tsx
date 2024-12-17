import * as React from "react";
import { cn } from "~/utils";
import { Heading } from "~/Heading";
import { type DialogProps } from "../Dialog";

type DialogHeaderProps = Pick<DialogProps, "title">;

const DialogHeaderBase = ({ title }: DialogHeaderProps) => {
    if (!title) {
        return null;
    }

    return (
        <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left text-neutral-primary")}>
            {typeof title === "string" ? <Heading level={4} as={"h1"} text={title} /> : title}
        </div>
    );
};

DialogHeaderBase.displayName = "DialogHeader";

export const DialogHeader = DialogHeaderBase;
