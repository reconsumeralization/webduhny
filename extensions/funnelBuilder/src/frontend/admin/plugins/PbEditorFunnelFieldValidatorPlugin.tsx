import { legacyPluginToReactComponent } from "@webiny/app/utils";
import * as React from "react";

export type RenderSettings = React.ComponentType<{
    setMessage: (message: string) => void;
    data: any;
    formFieldData?: Record<string, any>;
}>;

export interface PbEditorFunnelFieldValidatorPluginProps {
    validatorType: string;
    label: string;
    description: string;
    defaultMessage: string;
    defaultSettings?: Record<string, any>;
    renderSettings?: RenderSettings
}

export const PbEditorFunnelFieldValidatorPlugin =
    legacyPluginToReactComponent<PbEditorFunnelFieldValidatorPluginProps>({
        pluginType: "pb-editor-funnel-field-validator",
        componentDisplayName: "PbEditorFunnelFieldValidatorPlugin"
    });
