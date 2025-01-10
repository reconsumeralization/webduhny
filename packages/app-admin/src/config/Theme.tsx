import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";

declare module "graphql" {
    interface DocumentNode {
        __cacheKey: string;
    }
}

export interface ThemeConfig {
    name: string;
    label: string;
}

export interface ThemeProps {
    name: string;
    label?: string;
    children?: React.ReactNode;
    remove?: boolean;
    before?: string;
    after?: string;
}

export const Theme = makeDecoratable(
    "AdminTheme",
    ({ name, label, children, remove, before, after }: ThemeProps) => {
        const getId = useIdGenerator("theme");

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <>
                <Property
                    id={getId(name)}
                    name={"themes"}
                    remove={remove}
                    array={true}
                    before={placeBefore}
                    after={placeAfter}
                >
                    <Property id={getId(name, "name")} name={"name"} value={name} />
                    {label ? (
                        <Property id={getId(name, "label")} name={"label"} value={label} />
                    ) : null}
                    {children ?? null}
                </Property>
            </>
        );
    }
);
