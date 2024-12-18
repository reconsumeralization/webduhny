import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "~/utils";
import {
    Link as WebinyReactRouterLink,
    type LinkProps as WebinyReactRouterLinkProps
} from "@webiny/react-router";

const linkVariants = cva("font-sans rounded-xs", {
    variants: {
        size: {
            inherit: "[font-size:inherit]",
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl"
        },
        variant: {
            primary: [
                "text-accent-primary",
                "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-primary-dimmed"
            ],
            secondary: [
                "text-neutral-primary",
                "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-primary-dimmed"
            ],
            "primary-negative": [
                "text-accent-primary",
                "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-primary-strong"
            ],
            "secondary-negative": [
                "text-neutral-light",
                "focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-primary-strong"
            ]
        },
        underline: {
            true: "underline hover:no-underline",
            false: "hover:underline"
        }
    },
    defaultVariants: {
        size: "inherit",
        variant: "primary",
        underline: false
    }
});

interface LinkProps extends WebinyReactRouterLinkProps, VariantProps<typeof linkVariants> {
    disabled?: boolean;
}

const LinkBase = ({ size, variant, underline, className, children, ...rest }: LinkProps) => {
    return (
        <WebinyReactRouterLink
            {...rest}
            className={linkVariants({ size, variant, underline, className })}
        >
            {children}
        </WebinyReactRouterLink>
    );
};

LinkBase.displayName = "Link";

const Link = makeDecoratable("link", LinkBase);

export { Link, type LinkProps };
