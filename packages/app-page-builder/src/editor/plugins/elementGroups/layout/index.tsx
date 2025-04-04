import React from "react";
import { ReactComponent as LayoutIcon } from "@webiny/icons/view_quilt.svg";
import { PbEditorPageElementGroupPlugin } from "~/types";

const layoutGroup: PbEditorPageElementGroupPlugin = {
    name: "pb-editor-element-group-layout",
    type: "pb-editor-page-element-group",
    group: {
        title: "Layout",
        icon: <LayoutIcon />
    }
};

export default layoutGroup;
