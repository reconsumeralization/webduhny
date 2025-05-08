import { useContext } from "react";
import { DocumentEditorContext } from "./DocumentEditor";

export function useDocumentEditor() {
    const ctx = useContext(DocumentEditorContext);
    if (!ctx) {
        throw new Error("useDocumentEditor must be used within a <DocumentEditor /> context");
    }
    return ctx;
}
