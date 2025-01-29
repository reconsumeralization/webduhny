import React from "react";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { VariantProps } from "~/utils";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";
import { rootVariants } from "./Root";

interface CloseProps extends ToastPrimitives.ToastCloseProps {
    variant?: VariantProps<typeof rootVariants>["variant"];
}

const Close = ({ variant, ...props }: CloseProps) => (
    <ToastPrimitives.Close {...props} asChild>
        <IconButton
            icon={<Icon label={"Close"} icon={<CloseIcon />} />}
            size={"sm"}
            iconSize={"lg"}
            variant={variant === "subtle" ? "ghost" : "ghost-negative"}
        />
    </ToastPrimitives.Close>
);

export { Close };
