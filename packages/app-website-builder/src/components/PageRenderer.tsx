import React, { useEffect, useState } from "react";
import { DocumentRenderer } from "./DocumentRenderer.js";
import type { Document } from "~/types.js";
import { builderSdk } from "~/sdk/BuilderSDK.js";

export type Page = Document;

interface PageRendererProps {
    page: Page | null;
}

export function PageRenderer({ page }: PageRendererProps) {
    const [data, setData] = useState(page);

    const isPreview = builderSdk.isPreviewMode();

    useEffect(() => {
        if (isPreview) {
            // It doesn't matter what page we request, the SDK will return the data provided by the editor.
            builderSdk.getPage("*").then(previewData => {
                setData(previewData);
            });
        }
    }, []);

    if (isPreview && !data) {
        return <div>🔧 Waiting for preview data...</div>;
    }

    if (!data) {
        return null;
    }

    return <DocumentRenderer document={data} />;
}
