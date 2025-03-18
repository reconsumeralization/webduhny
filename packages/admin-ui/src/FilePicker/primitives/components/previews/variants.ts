import { cva } from "~/utils";

export const previewVariants = cva("wby-w-full", {
    variants: {
        variant: {
            light: ["wby-bg-neutral-light", "hover:wby-bg-neutral-dimmed"],
            base: ["wby-bg-neutral-base", "hover:wby-bg-neutral-subtle"],
            transparent: ["wby-bg-transparent", "hover:wby-bg-neutral-dark/5"]
        },
        disabled: {
            true: "wby-pointer-events-none"
        }
    },
    compoundVariants: [
        {
            disabled: true,
            variant: "light",
            className: "wby-bg-neutral-dimmed"
        },
        {
            disabled: true,
            variant: "base",
            className: "wby-bg-neutral-disabled"
        },
        {
            disabled: true,
            variant: "transparent",
            className: "wby-bg-transparent"
        }
    ],
    defaultVariants: {
        variant: "light"
    }
});
