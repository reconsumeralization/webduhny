import React from "react";
import { ColorsObject } from "./types";
import { assignColorCssVariables } from "./utils";

export interface AdminThemeProps {
    colors?: Partial<ColorsObject>;
}

export const AdminTheme = React.memo((props: AdminThemeProps) => {
    assignColorCssVariables("primary", props.colors);
    assignColorCssVariables("secondary", props.colors);
    assignColorCssVariables("neutral", props.colors);
    assignColorCssVariables("success", props.colors);
    assignColorCssVariables("warning", props.colors);
    assignColorCssVariables("destructive", props.colors);
    return null;
});

AdminTheme.displayName = "AdminTheme";
