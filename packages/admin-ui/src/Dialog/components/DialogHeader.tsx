import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { ReactComponent as XIcon } from "@webiny/icons/close.svg";
import { IconButton } from "~/Button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useMemo } from "react";

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DialogProps, "title" | "icon" | "description" | "showCloseButton">;

export const DialogHeader = ({
    title,
    icon,
    description,
    showCloseButton,
    className,
    ...props
}: DialogHeaderProps) => {
    const nothingToRender = useMemo(() => {
        return !title && !description && !icon && !showCloseButton;
    }, [title, description, icon, showCloseButton]);

    if (nothingToRender) {
        return null;
    }

    return (
        <div
            {...props}
            className={cn(
                "wby-flex wby-flex-col wby-gap-sm wby-px-lg wby-py-md wby-text-center wby-sm:text-left wby-text-neutral-primary",
                className
            )}
        >
            <DialogTitle className={"wby-flex wby-justify-between"}>
                <div className={"wby-flex wby-gap-xs"}>
                    {icon}
                    {title}
                </div>

                {showCloseButton !== false && (
                    <DialogPrimitive.Close asChild>
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DialogPrimitive.Close>
                )}
            </DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
        </div>
    );
};
