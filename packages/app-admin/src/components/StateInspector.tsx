import React from "react";
import Editor from "@monaco-editor/react";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { FloatingPanel } from "~/components";

const monacoTheme = "vs-light";
const monacoOptions = { minimap: { enabled: false } };

interface StateInspectorProps {
    title: string;
    shortcut: string;
    state: Record<string, any>;
}

export const StateInspector = (props: StateInspectorProps) => {
    return (
        <FloatingPanel shortcut={props.shortcut} dragHandle={".mdc-tab-scroller"}>
            {({ height }) => (
                <Tabs>
                    <Tab label={props.title}>
                        <Editor
                            theme={monacoTheme}
                            height={height - 48}
                            defaultLanguage={"json"}
                            value={JSON.stringify(props.state, null, 2)}
                            options={monacoOptions}
                        />
                    </Tab>
                </Tabs>
            )}
        </FloatingPanel>
    );
};
