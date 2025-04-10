import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { useMemo } from "react";

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DialogProps, "title" | "icon" | "description">;

export const DialogHeader = ({
    title,
    icon,
    description,
    className,
    ...props
}: DialogHeaderProps) => {
    const nothingToRender = useMemo(() => {
        return !title && !description && !icon;
    }, [title, description, icon]);

    if (nothingToRender) {
        return null;
    }

    return (
        <div
            {...props}
            className={cn(
                "wby-flex wby-flex-col wby-gap-sm wby-px-lg wby-pt-md wby-pb-md-extra wby-mr-xl wby-sm:text-left wby-text-neutral-primary",
                className
            )}
        >
            <DialogTitle className={"wby-flex wby-justify-between"}>
                <div className={"wby-flex wby-gap-xs"}>
                    {icon}
                    {title}
                </div>
            </DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
        </div>
    );
};
