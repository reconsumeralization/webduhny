import React from "react";
import { PbEditorPageElementGroupPlugin } from "../admin/PbEditorPageElementGroupPlugin";
import { ReactComponent as FunnelBuilderIcon } from "@material-design-icons/svg/outlined/filter_alt.svg";

export const FubPageElementGroup = () => {
    return (
        <PbEditorPageElementGroupPlugin
            name={"funnelBuilder"}
            title={"Funnel Builder"}
            icon={<FunnelBuilderIcon />}
        />
    );
};
