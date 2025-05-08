import React, { useRef, useEffect } from "react";
import { DocumentEditorSDK, DocumentEditorMessage } from "./DocumentEditorSDK";
import { Editor } from "./Editor";

const IFRAME_SRC = "/iframeContent.html";

// Example initial state for document (adjust as needed)
const initialDocumentState = {
    elements: [],
    bindings: []
};

export const DocumentEditorContext = React.createContext<Editor<any> | undefined>(undefined);

interface DocumentEditorProps {
    editor: Editor<any>;
    children?: React.ReactNode;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ editor, children }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const sdkRef = useRef<DocumentEditorSDK>();
    const [lastMessage, setLastMessage] = React.useState<string>("");

    // Initialize SDK
    if (!sdkRef.current) {
        sdkRef.current = new DocumentEditorSDK();
    }

    // Attach/detach SDK listeners
    useEffect(() => {
        sdkRef.current!.onMessage((msg: DocumentEditorMessage) => {
            if (msg.type === "FROM_IFRAME") {
                setLastMessage(msg.payload);
            }
        });
        sdkRef.current!.attach();
        return () => sdkRef.current!.detach();
    }, []);

    // Set iframe ref for SDK
    useEffect(() => {
        sdkRef.current!.setIframe(iframeRef.current);
    }, [iframeRef.current]);

    // Example: send initial message after iframe loads
    const handleIframeLoad = () => {
        sdkRef.current!.sendMessage({ type: "FROM_PARENT", payload: "Hello from parent!" });
    };

    const handleSend = () => {
        sdkRef.current!.sendMessage({ type: "FROM_PARENT", payload: "Button clicked!" });
    };

    // Example: using editor API
    const handleSelectElement = () => {
        editor.updateEditor(state => state.selectElement("element-123"));
    };
    const handleUndo = () => {
        editor.undo();
    };
    const handleRedo = () => {
        editor.redo();
    };

    return (
        <DocumentEditorContext.Provider value={editor}>
            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                <h2>Document Editor (Parent)</h2>
                <button onClick={handleSend}>Send Message to Iframe</button>
                <button onClick={handleSelectElement}>Select Element</button>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
                <div style={{ margin: "8px 0", color: "#888" }}>Last message from iframe: {lastMessage}</div>
                <iframe
                    ref={iframeRef}
                    src={IFRAME_SRC}
                    title="Document Iframe"
                    style={{ flex: 1, border: "1px solid #ccc", marginTop: 8 }}
                    onLoad={handleIframeLoad}
                />
                {children}
            </div>
        </DocumentEditorContext.Provider>
    );
};
