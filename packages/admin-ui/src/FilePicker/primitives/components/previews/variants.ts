import { cva } from "~/utils";

export const previewVariants = cva("wby-w-full", {
    variants: {
        variant: {
            light: "wby-bg-neutral-light",
            base: "wby-bg-neutral-base",
            transparent: "wby-bg-transparent"
        }
    },
    defaultVariants: {
        variant: "light"
    }
});
