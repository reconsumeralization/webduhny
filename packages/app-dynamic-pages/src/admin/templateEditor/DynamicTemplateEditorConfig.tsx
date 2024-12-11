import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";
import { EntrySelector } from "~/admin/templateEditor/EntrySelector";
import { hasMainDataSource } from "~/features";
import { ElementEventHandlers } from "./ElementEventHandlers";
import { SetupDynamicDocument } from "~/admin/templateEditor/SetupDynamicDocument";
import { SetupDynamicDataInEditor, useDynamicDocument } from "~/dataInjection";

const { Ui } = TemplateEditorConfig;

const OnDynamicTemplate = ({ children }: { children: React.ReactNode }) => {
    const { dataSources } = useDynamicDocument();

    return hasMainDataSource(dataSources) ? <>{children}</> : null;
};

export const DynamicTemplateEditorConfig = () => {
    return (
        <>
            <TemplateEditorConfig>
                <SetupDynamicDocument />
                <SetupDynamicDataInEditor />
                <Ui.TopBar.Element
                    name={"entrySelector"}
                    element={
                        <OnDynamicTemplate>
                            <EntrySelector />
                        </OnDynamicTemplate>
                    }
                    group={"center"}
                />

                <ElementEventHandlers />
            </TemplateEditorConfig>
        </>
    );
};
