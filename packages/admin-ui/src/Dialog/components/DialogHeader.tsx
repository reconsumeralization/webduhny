import * as React from "react";
import { cn } from "~/utils";
import { Heading } from "~/Heading";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { Text } from "~/Text";

type DialogHeaderProps = Pick<DialogProps, "title" | "description">;

const DialogHeaderBase = ({ title, description }: DialogHeaderProps) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div className={cn("flex flex-col gap-y-xs text-center sm:text-left text-neutral-primary")}>
            {title && (
                <DialogTitle>
                    {typeof title === "string" ? (
                        <Heading level={4} as={"h1"} text={title} />
                    ) : (
                        title
                    )}
                </DialogTitle>
            )}

            {description && (
                <DialogDescription>
                    {typeof description === "string" ? (
                        <Text text={description} size="sm" className={"text-neutral-strong"} />
                    ) : (
                        description
                    )}
                </DialogDescription>
            )}
        </div>
    );
};

DialogHeaderBase.displayName = "DialogHeader";

export const DialogHeader = DialogHeaderBase;
