import React from "react";
import Editor from "@monaco-editor/react";
import { FloatingPanel } from "@webiny/app-admin/components";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { useActiveElement } from "~/editor";
import { useDynamicDocument } from "~/dataInjection";
import { usePageBlocks } from "~/admin/contexts/AdminPageBuilder/PageBlocks/usePageBlocks";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";

const monacoTheme = "vs-light";
const monacoOptions = { minimap: { enabled: false } };

export const DataInspector = () => {
    const [activeElement] = useActiveElement();
    const { dataBindings, dataSources } = useDynamicDocument();
    const { blockVariables } = useBlockVariables();
    const { pageBlocks } = usePageBlocks();

    const isBlock = activeElement?.type === "block";
    const savedBlockId = isBlock ? activeElement.data.blockId : false;
    const savedBlock = pageBlocks.find(block => block.id === savedBlockId);

    return (
        <FloatingPanel shortcut={"Cmd+E"} dragHandle={".mdc-tab-scroller"}>
            {({ height }) => (
                <Tabs>
                    <Tab label="Data Bindings">
                        <Editor
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            value={JSON.stringify(dataBindings, null, 2)}
                            options={monacoOptions}
                        />
                    </Tab>
                    <Tab label="Data Sources">
                        <Editor
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            value={JSON.stringify(dataSources, null, 2)}
                            options={monacoOptions}
                        />
                    </Tab>
                    <Tab label="Block Variables">
                        <Editor
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            value={JSON.stringify(blockVariables, null, 2)}
                            options={monacoOptions}
                        />
                    </Tab>
                    <Tab label="Active Element" disabled={!activeElement}>
                        <Editor
                            key={activeElement?.id}
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            options={monacoOptions}
                            value={activeElement ? JSON.stringify(activeElement, null, 2) : ""}
                        />
                    </Tab>
                    <Tab label="Saved Block" disabled={!savedBlock}>
                        <Editor
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            options={monacoOptions}
                            value={savedBlock ? JSON.stringify(savedBlock, null, 2) : ""}
                        />
                    </Tab>
                </Tabs>
            )}
        </FloatingPanel>
    );
};
