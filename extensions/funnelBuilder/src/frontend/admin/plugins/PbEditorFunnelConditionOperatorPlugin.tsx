import { legacyPluginToReactComponent } from "@webiny/app/utils";
import * as React from "react";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";
import { FunnelConditionOperatorModel } from "../../../shared/models/FunnelConditionOperatorModel";

export type ConditionOperatorParamsComponent = React.ComponentType<{
    field?: FunnelFieldDefinitionModelDto;
}>;

export interface PbEditorFunnelConditionOperatorPluginProps {
    operatorClass: typeof FunnelConditionOperatorModel<any, any>;
    settingsRenderer?: ConditionOperatorParamsComponent;
}

export const PbEditorFunnelConditionOperatorPlugin =
    legacyPluginToReactComponent<PbEditorFunnelConditionOperatorPluginProps>({
        pluginType: "pb-editor-funnel-condition-operator",
        componentDisplayName: "PbEditorFunnelConditionOperatorPlugin"
    });
