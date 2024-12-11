import React from "react";
import { PageEditorConfig } from "@webiny/app-page-builder/pageEditor";
import { SetupDynamicDocument } from "~/admin/pageEditor/SetupDynamicDocument";
import { SetupDynamicDataInEditor } from "~/dataInjection";
import { ElementEventHandlers } from "./ElementEventHandlers";

export const DynamicPageEditorConfig = () => {
    return (
        <>
            <PageEditorConfig>
                <SetupDynamicDocument />
                <SetupDynamicDataInEditor />
                <ElementEventHandlers />
            </PageEditorConfig>
        </>
    );
};
