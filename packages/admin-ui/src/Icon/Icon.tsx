import React from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils";

const iconVariants = cva("", {
    variants: {
        size: {
            xs: "wby-size-sm-extra",
            sm: "wby-size-md",
            md: "wby-size-md-plus",
            lg: "wby-size-lg"
        },
        color: {
            inherit: "wby-fill-inherit",
            accent: "wby-fill-accent-default",
            neutral: "wby-fill-neutral-base",
            "neutral-light": "wby-fill-neutral-strong",
            "neutral-strong": "wby-fill-neutral-xstrong"
        }
    },
    defaultVariants: {
        size: "md",
        color: "inherit"
    }
});

interface IconProps
    extends Omit<React.HTMLAttributes<HTMLOrSVGElement>, "color">,
        VariantProps<typeof iconVariants> {
    label: string;
    icon: React.ReactElement;
}

const IconBase = React.forwardRef<HTMLOrSVGElement, IconProps>((props, ref) => {
    const { label, icon, color, size, className, ...rest } = props;
    return (
        <AccessibleIcon.Root label={label}>
            {React.cloneElement(icon, {
                ...rest,
                className: cn(iconVariants({ color, size, className })),
                ref
            })}
        </AccessibleIcon.Root>
    );
});

IconBase.displayName = "Icon";

const Icon = makeDecoratable("Icon", IconBase);

export { Icon, type IconProps };
