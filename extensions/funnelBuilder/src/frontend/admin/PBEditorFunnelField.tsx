import { legacyPluginToReactComponent } from "@webiny/app/utils";
import { PbEditorEventActionPlugin as BasePbEditorEventActionPlugin } from "@webiny/app-page-builder/types";
import * as React from "react";

export type FbBuilderFieldPlugin = Plugin & {
    type: "form-editor-field-type";
    field: {
        group?: string;
        unique?: boolean;
        type: string;
        name: string;
        label: string;
        validators?: string[];
        renderSettings?: (params: {
            form: FormRenderPropParams;
            afterChangeLabel: (value: string) => void;
            uniqueFieldIdValidator: (fieldId: string) => void;
        }) => React.ReactNode;
    };
};

type PbEditorEventActionPlugin = Pick<
    BasePbEditorEventActionPlugin,
    "onEditorMount" | "onEditorUnmount"
>;

export const PbEditorEventActionPlugin = legacyPluginToReactComponent<PbEditorEventActionPlugin>({
    pluginType: "pb-editor-event-action-plugin",
    componentDisplayName: "PbEditorEventActionPlugin"
});
