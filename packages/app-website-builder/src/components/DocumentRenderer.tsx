import React from "react";
import type { Document } from "~/types.js";
import { ElementRenderer } from "./ElementRenderer";

const rootId = "root";

interface DocumentRendererProps {
    document: Document;
}

export const DocumentRenderer = (_: DocumentRendererProps) => {
    return <ElementRenderer id={rootId} />;
};
