import { ColorPicker } from "@webiny/ui/ColorPicker/index.js";
import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Monaco from "@monaco-editor/react";
import styled from "@emotion/styled";
import { CommandPriority } from "~/editor/CommandBus.js";
import { Messenger } from "~/messenger/index.js";
import { createCommand } from "../editor/createCommand.js";
import type { HistorySnapshot } from "../editor/HistorySnapshot.js";
import { Editor } from "../editor/Editor.js";
import { ButtonPrimary, ButtonSecondary } from "@webiny/ui/Button/index.js";
import { DocumentEditorContext } from "~/editor/DocumentEditor.js";
import { ConnectEditorToPreview } from "./ConnectEditorToPreview.js";
import mockPage1 from "./mocks/mockPage1.js";

const Container = styled.div`
    display: flex;
    height: 50vh;
`;

const Column = styled.div`
    position: relative;
    outline: 1px red solid;
    max-height: 100%;
    overflow-y: auto;
    width: 50%;
`;

const Actions = styled.div`
    position: absolute;
    display: flex;
    grid-gap: 20px;
    bottom: 20px;
    right: 35px;
    z-index: 1000;
`;

const DocumentContainer = styled.div`
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    width: calc(100vw - 80px);
    min-height: 450px;
    background-color: white;
`;

type Page = Record<string, any>;

const monacoOptions = { minimap: { enabled: false } };

const editor = new Editor<Page>({
    properties: {
        title: "Untitled",
        path: "/untitled"
    },
    state: {},
    elements: {
        root: {
            type: "Webiny/Element",
            id: "root",
            // An element doesn't have to have a `component` defined.
            children: ["4ETOAnHNei7", "2B6ROAnHFao3"]
        },
        "4ETOAnHNei7": {
            type: "Webiny/Element",
            id: "4ETOAnHNei7",
            component: {
                name: "Webiny/Text",
                options: {
                    text: "Hello!"
                }
            },
            // Each element defined within a template needs to have a `source: "template"` flag set.
            source: "template",
            inputs: [
                {
                    inputName: "text",
                    label: "Product title",
                    target: "component.options.text"
                }
            ]
        },
        "2B6ROAnHFao3": {
            type: "Webiny/Element",
            id: "2B6ROAnHFao3",
            component: {
                // Block refs will be resolved using a `BlocksRepository`. This component will fetch and render
                // the actual block, using the inputs passed from the parent element container.
                name: "Webiny/BlockRef",
                options: {
                    blockId: "B6ROAnHFao3",
                    inputs: {}
                }
            }
        }
    }
});

// @ts-ignore Temp
window.editor = editor;

const formatSnapshots = (snapshots: HistorySnapshot[], activeIndex: number) => {
    return snapshots
        .map((snapshot, index) => {
            const asString = JSON.stringify(snapshot.getState(), null, 2);
            const isActive = activeIndex === index;

            return `// ${isActive ? "🟢" : "⚪️"} Snapshot #${index + 1} (${snapshot
                .getCreatedOn()
                .toISOString()})\n${asString}`;
        })
        .join(",\n");
};

const MonacoEditor = styled(Monaco)`
    height: 100vh;
`;

const demoCode = `
editor.updateDocument(document => {
    document.elements["4ETOAnHNei7"] = {
      "type": "Webiny/Element",
      "id": "4ETOAnHNei7",
      "component": {
        "name": "Webiny/Text",
        "options": {
          "text": "Hello!"
        }
      }
    }
})
`;

const ON_DROP = createCommand<string>("ON_DROP");

const iframeUrl = "http://localhost:3000/page-1?wb.preview=true";

export const DocumentEditorSandbox = observer(() => {
    const documentState = editor.getDocumentState();
    const editorState = editor.getEditorState();
    const codeRef = useRef(demoCode);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const dropHandler1 = editor.registerCommand(
            ON_DROP,
            payload => {
                console.log("Running NORMAL priority onDrop");
                editor.updateEditor(state => {
                    state.selectElement(payload);
                });

                editor.updateDocument(document => {
                    document.title = "From drop!" + `(${payload})`;
                    document.content.elements.push("123");
                });
            },
            CommandPriority.NORMAL
        );

        const dropHandler2 = editor.registerCommand(
            ON_DROP,
            (_, control) => {
                console.log("Running HIGH priority onDrop");
                editor.updateDocument(document => {
                    document.title += " HIGH PRIORITY!";
                });

                return control.stop();
            },
            CommandPriority.HIGH
        );

        return () => {
            dropHandler1();
            dropHandler2();
        };
    }, []);

    const history = documentState.getHistory();

    const evaluateCode = () => {
        try {
            eval(codeRef.current);
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    };

    const undo = () => {
        editor.undo();
    };

    const redo = () => {
        editor.redo();
    };

    const availableSnapshots = history.getSnapshots().length;
    const currentSnapshotIndex = history.getActiveSnapshotIndex();
    const isLatestSnapshot = currentSnapshotIndex === availableSnapshots - 1;
    const isOldestSnapshot = currentSnapshotIndex === 0;

    const monacoValue = `// Editor State\n${JSON.stringify(
        editorState.toJson(),
        null,
        2
    )}\n\n// Document State\n${JSON.stringify(
        documentState.toJson(),
        null,
        2
    )}\n\n// History\n\n${formatSnapshots(history.getSnapshots(), history.getActiveSnapshotIndex())}
    \n// Snapshot Changes\n${JSON.stringify(history.getCurrentSnapshot().getChanges(), null, 2)}`;

    const onConnected = useCallback((messenger: Messenger) => {
        // @ts-ignore temp
        window["messenger"] = messenger;
        setTimeout(() => {
            messenger.send("document.set", mockPage1);
        }, 2000);

        editor.onDocumentStateChange(event => {
            if (event.reason === "update") {
                messenger.send("document.patch", event.diff);
            } else {
                messenger.send("document.set", event.state);
            }
        });
    }, []);

    const color = documentState.read().elements["4ETOAnHNei7"].component.options.color || "#23dafa";

    const onColorChange = (color: string) => {
        window["messenger"].send(`element.patch.4ETOAnHNei7`, {
            "component.options.color": color
        });
    };

    return (
        <DocumentEditorContext.Provider value={editor}>
            <Container>
                <Column>
                    <MonacoEditor
                        height={"100vh"}
                        language={"javascript"}
                        defaultValue={codeRef.current}
                        options={monacoOptions}
                        onChange={value => (codeRef.current = value || "")}
                    />
                    <Actions>
                        <ButtonSecondary
                            onClick={() => editor.executeCommand(ON_DROP, "From btn click!")}
                        >
                            Dispatch
                        </ButtonSecondary>
                        <ButtonSecondary disabled={isOldestSnapshot} onClick={undo}>
                            Undo
                        </ButtonSecondary>
                        <ButtonSecondary disabled={isLatestSnapshot} onClick={redo}>
                            Redo
                        </ButtonSecondary>
                        <ButtonPrimary onClick={evaluateCode}>Evaluate</ButtonPrimary>
                    </Actions>
                </Column>
                <Column>
                    <MonacoEditor
                        height={"100vh"}
                        language={"json"}
                        value={monacoValue}
                        options={monacoOptions}
                    />
                </Column>
            </Container>
            <ConnectEditorToPreview iframeRef={iframeRef} onConnected={onConnected} />

            <DocumentContainer>
                <ColorPicker value={color} onChange={onColorChange} />
                <iframe
                    style={{ height: "100%", width: "100%", minHeight: "inherit" }}
                    src={iframeUrl}
                    ref={iframeRef}
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
                />
            </DocumentContainer>
        </DocumentEditorContext.Provider>
    );
});
