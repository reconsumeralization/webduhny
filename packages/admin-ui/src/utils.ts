import React from "react";
import { clsx, type ClassValue } from "clsx";
import { generateId as baseGenerateId } from "@webiny/utils/generateId";
import { extendTailwindMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
export { makeDecoratable } from "@webiny/react-composition";
import { borderWidth, borderColor } from "../tailwind.config.theme";

const flattenConfigObject = (prefix: string, config: Record<string, any>): string[] => {
    if (!prefix) {
        return [];
    }

    const keys: string[] = [];

    for (const key in config) {
        if (key === "DEFAULT") {
            continue;
        } // Skip "DEFAULT" keys
        if (typeof config[key] === "object") {
            keys.push(...flattenConfigObject(`${prefix}-${key}`, config[key]));
        } else {
            keys.push(`${prefix}-${key}`);
        }
    }

    return keys;
};

const twMerge = extendTailwindMerge({
    override: {
        theme: {
            borderWidth: Object.keys(borderWidth),
            borderColor: Object.keys(flattenConfigObject("border", borderColor))
        },
        /**
         * Note: `ringWidth` and `ringColor` cannot be used in the above theme configuration.
         * For more details, refer to the Tailwind Merge documentation:
         * @link https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md#theme
         */
        classGroups: {
            "ring-color": [
                "ring-primary",
                "ring-primary-dimmed",
                "ring-primary-strong",
                "ring-primary-subtle",
                "ring-success",
                "ring-success-dimmed",
                "ring-success-strong",
                "ring-success-subtle"
            ],
            "ring-w": ["ring-sm", "ring-md", "ring-lg"]
        }
    }
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateId = (initialId?: string) => {
    if (initialId) {
        return initialId;
    }
    return "wby-" + baseGenerateId(4);
};

export const withStaticProps = <TComponent extends React.ComponentType<any>, TProps>(
    component: TComponent,
    props: TProps
) => {
    return Object.assign(component, props) as TComponent & TProps;
};

export { cva, type VariantProps };
