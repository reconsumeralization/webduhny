import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";
import { EntrySelector } from "~/admin/templateEditor/EntrySelector";
import { EntryDataPreview } from "./EntryDataPreview/EntryDataPreview";
import { hasMainDataSource } from "~/features";
import { Elements } from "~/admin/elements/Elements";
import { ElementEventHandlers } from "~/admin/elements/eventHandlers/ElementEventHandlers";
import { DisableGridDelete } from "~/admin/templateEditor/DisableGridDelete";
import { ElementDataSettings } from "./ElementDataSettings";
import { DataSourceConfigAndBindings } from "./DataSourceConfigAndBindings";
import { SetupDynamicDocument } from "~/admin/templateEditor/SetupDynamicDocument";
import { useDynamicDocument } from "~/dataInjection";

const { Ui } = TemplateEditorConfig;

const OnDynamicTemplate = ({ children }: { children: React.ReactNode }) => {
    const { dataSources } = useDynamicDocument();

    return hasMainDataSource(dataSources) ? <>{children}</> : null;
};

export const DynamicTemplateEditorConfig = () => {
    return (
        <>
            {/* Register new editor element plugins. This has to be done before the editor mounts. */}
            <Elements />
            <TemplateEditorConfig>
                <SetupDynamicDocument />
                {/* Disable "delete" action on grids that are children of "entries-list" element. */}
                <DisableGridDelete />
                <Ui.TopBar.Element
                    name={"entrySelector"}
                    element={
                        <OnDynamicTemplate>
                            <EntrySelector />
                        </OnDynamicTemplate>
                    }
                    group={"center"}
                />
                <Ui.Sidebar.Group
                    name={"data"}
                    element={
                        <OnDynamicTemplate>
                            <ElementDataSettings />
                        </OnDynamicTemplate>
                    }
                />
                <EntryDataPreview />
                <ElementEventHandlers />
                <DataSourceConfigAndBindings />
            </TemplateEditorConfig>
        </>
    );
};
