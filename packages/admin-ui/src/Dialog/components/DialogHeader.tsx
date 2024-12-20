import * as React from "react";
import { cn } from "~/utils";
import { Heading } from "~/Heading";
import { type DialogProps } from "../Dialog";
import {Text} from "~/Text";

type DialogHeaderProps = Pick<DialogProps, "title" | "description">;

const DialogHeaderBase = ({ title, description }: DialogHeaderProps) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div className={cn("flex flex-col gap-y-xs text-center sm:text-left text-neutral-primary")}>
            {typeof title === "string" ? <Heading level={4} as={"h1"} text={title} /> : title}
            {typeof description === "string" ? (
                <Text text={description} size="sm" className={"text-neutral-strong"} />
            ) : (
                description
            )}
        </div>
    );
};

DialogHeaderBase.displayName = "DialogHeader";

export const DialogHeader = DialogHeaderBase;
