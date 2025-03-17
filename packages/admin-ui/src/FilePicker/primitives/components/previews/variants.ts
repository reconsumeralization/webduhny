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
    defaultVariants: {
        variant: "light"
    }
});
