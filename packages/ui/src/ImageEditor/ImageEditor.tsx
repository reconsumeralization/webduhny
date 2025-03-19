import React from "react";

interface RenderPropArgs {
    render: () => React.ReactNode;
    getCanvasDataUrl: () => string;
    activeTool: any;
    applyActiveTool: () => Promise<void>;
    cancelActiveTool: () => Promise<void>;
}

interface ImageEditorPropsPropsOptions {
    autoEnable: boolean;
}

interface ImageEditorProps {
    src: string;
    tools: any[];
    options?: {
        flip: ImageEditorPropsPropsOptions;
        filter: ImageEditorPropsPropsOptions;
        crop: ImageEditorPropsPropsOptions;
        rotate: ImageEditorPropsPropsOptions;
    };
    onToolActivate?: () => void;
    onToolDeactivate?: () => void;
    children?: (props: RenderPropArgs) => React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please check the `ImageEditor` component inside the `@webiny/app-file-manager` package instead.
 */
export const ImageEditor = ({}: ImageEditorProps) => {
    return (
        <>
            {
                "Deprecated component! The original code has been moved to `@webiny/app-file-manager` package."
            }
        </>
    );
};
