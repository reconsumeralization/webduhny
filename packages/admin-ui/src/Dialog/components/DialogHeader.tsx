import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { IconButton } from "~/Button";
import * as DialogPrimitive from "@radix-ui/react-dialog";

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
    if (!title && !description) {
        return null;
    }

    return (
        <div
            {...props}
            className={cn(
                "wby-flex wby-flex-col wby-gap-sm wby-px-lg wby-py-md wby-text-center sm:wby-text-left wby-text-neutral-primary",
                className
            )}
        >
            <div className={"wby-relative"}>
                {showCloseButton !== false && (
                    <DialogPrimitive.Close asChild className="wby-absolute wby-right-0 wby-top-0">
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DialogPrimitive.Close>
                )}
                <DialogTitle>
                    {icon}
                    {title}
                </DialogTitle>
            </div>
            <DialogDescription>{description}</DialogDescription>
        </div>
    );
};
