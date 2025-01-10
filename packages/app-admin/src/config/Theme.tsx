import React from "react";
import { makeDecoratable } from "~/index";
import { Property } from "@webiny/react-properties";

export interface ThemeConfig {
    name: string;
    label: string;
}

export interface ThemeProps {
    children?: React.ReactNode;
}

const ThemeBase = makeDecoratable("AdminTheme", ({ children = null }: ThemeProps) => {
    return (
        <>
            <Property name={"themes"} array={true}>
                {children}
            </Property>
        </>
    );
});

export interface AdminThemeColor {
    palette: "primary" | "secondary" | "neutral" | "success" | "warning" | "danger";
    color: string;
    shade?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

const Color = makeDecoratable("AdminThemeColor", ({ palette, color, shade }: AdminThemeColor) => {
    return (
        <>
            <Property name={"colors"} array={true}>
                <Property name={"palette"} value={palette} />
                <Property name={"color"} value={color} />
                <Property name={"shade"} value={shade} />
            </Property>
        </>
    );
});

export const Theme = Object.assign(ThemeBase, {
    Color
});
