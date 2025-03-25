import * as React from "react";
import { cn } from "~/utils";
import { type DrawerProps } from "../Drawer";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerDescription } from "./DrawerDescription";
import { ReactComponent as XIcon } from "@webiny/icons/close.svg";
import { IconButton } from "~/Button";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { useMemo } from "react";

export type DrawerHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DrawerProps, "title" | "icon" | "description" | "showCloseButton">;

export const DrawerHeader = ({
    title,
    icon,
    description,
    showCloseButton,
    className,
    ...props
}: DrawerHeaderProps) => {
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
                "wby-flex wby-flex-col wby-gap-sm wby-px-lg wby-py-md wby-text-center sm:wby-text-left wby-text-neutral-primary",
                className
            )}
        >
            <DrawerTitle className={"wby-flex wby-justify-between"}>
                <div className={"wby-flex wby-gap-xs"}>
                    {icon}
                    {title}
                </div>

                {showCloseButton !== false && (
                    <DrawerPrimitive.Close asChild>
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DrawerPrimitive.Close>
                )}
            </DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
        </div>
    );
};
