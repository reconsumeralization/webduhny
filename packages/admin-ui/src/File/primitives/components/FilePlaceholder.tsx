import * as React from "react";
import { ReactComponent as ImageIcon } from "@material-design-icons/svg/outlined/image.svg";
import { Button } from "~/Button";
import { cn, cva, type VariantProps } from "~/utils";

const filePlaceholderVariants = cva("wby-flex", {
    variants: {
        type: {
            compact: "wby-w-full",
            area: ["wby-justify-center", "wby-px-xl wby-py-md-extra"]
        },
        variant: {
            primary: "",
            secondary: "",
            ghost: ""
        }
    },
    compoundVariants: [
        {
            type: "area",
            variant: "primary",
            className: [
                "wby-bg-neutral-subtle",
                "hover:wby-bg-neutral-light",
                "data-[disabled=true]:wby-bg-neutral-disabled"
            ]
        },
        {
            type: "area",
            variant: "secondary",
            className: ["wby-bg-neutral-base"]
        },
        {
            type: "area",
            variant: "secondary",
            className: [
                "wby-bg-neutral-subtle",
                "hover:wby-bg-neutral-light",
                "data-[disabled=true]:wby-bg-transparent"
            ]
        }
    ],
    defaultVariants: {
        type: "compact",
        variant: "primary"
    }
});

interface FilePlaceholderProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof filePlaceholderVariants> {
    disabled?: boolean;
    text?: string;
}

const FilePlaceholder = ({
    text = "Select from library",
    type,
    variant,
    disabled,
    className,
    ...props
}: FilePlaceholderProps) => {
    return (
        <div
            data-role={"select-image"}
            data-disabled={disabled}
            className={cn(filePlaceholderVariants({ type, variant }), className)}
            {...props}
        >
            <Button
                className={cn(type !== "area" ? "wby-w-full" : "")}
                text={text}
                icon={<ImageIcon />}
                variant={"ghost"}
                size={"sm"}
                disabled={disabled}
            />
        </div>
    );
};

export { FilePlaceholder, type FilePlaceholderProps, filePlaceholderVariants };
