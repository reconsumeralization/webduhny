import React from "react";
import Editor from "@monaco-editor/react";
import { FloatingPanel } from "@webiny/app-admin/components";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { useActiveElement } from "~/editor";
import { ButtonPrimary } from "@webiny/ui/Button";
import styled from "@emotion/styled";
import { useDynamicDocument } from "~/dataInjection";
import { usePageBlocks } from "~/features";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import { usePage } from "~/pageEditor";

const FlexLayout = styled.div`
    display: flex;
    width: inherit;
    padding: 5px;
    grid-gap: 10px;
    > button {
        flex: 1;
    }
`;

const monacoTheme = "vs-light";
const monacoOptions = { minimap: { enabled: false } };

export const DataInspector = () => {
    const [activeElement] = useActiveElement();
    const { updateDataBindings, updateDataSources } = useDynamicDocument();
    const { updateVariables } = useBlockVariables();
    const { pageBlocks } = usePageBlocks();
    const [page] = usePage();

    const resetDataBindings = () => {
        updateDataBindings(() => []);
    };

    const resetDataSources = () => {
        updateDataSources(() => []);
    };

    const resetBlockVariables = () => {
        updateVariables(() => []);
    };

    const isBlock = activeElement?.type === "block";
    const savedBlockId = isBlock ? activeElement.data.blockId : false;
    const savedBlock = pageBlocks.find(block => block.id === savedBlockId);

    return (
        <FloatingPanel shortcut={"Cmd+E"} dragHandle={".mdc-tab-scroller"}>
            {({ height }) => (
                <Tabs>
                    <Tab label="Page">
                        <FlexLayout>
                            <ButtonPrimary onClick={resetDataBindings}>
                                Reset Data Bindings
                            </ButtonPrimary>
                            <ButtonPrimary onClick={resetDataSources}>
                                Reset Data Sources
                            </ButtonPrimary>
                            <ButtonPrimary onClick={resetBlockVariables}>
                                Reset Block Variables
                            </ButtonPrimary>
                        </FlexLayout>
                        <Editor
                            theme={monacoTheme}
                            height={height - 48 - 46}
                            defaultLanguage={"json"}
                            value={JSON.stringify(page, null, 2)}
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
