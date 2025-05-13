import React, { useEffect, useRef, useState } from "react";
import { MessageOrigin, Messenger } from "~/messenger";

type ConnectEditorToPreviewProps = {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    onConnected: (messenger: Messenger) => void;
};

export function ConnectEditorToPreview({ iframeRef, onConnected }: ConnectEditorToPreviewProps) {
    const messengerRef = useRef<Messenger | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!iframeRef.current?.contentWindow) {
            return;
        }

        const targetWindow = iframeRef.current.contentWindow;
        const targetOrigin = new URL(iframeRef.current.src).origin;

        const editorOrigin = new MessageOrigin(window, window.location.origin);
        const previewTarget = new MessageOrigin(targetWindow, targetOrigin);

        const messenger = new Messenger(editorOrigin, previewTarget, "wb.editor.*");
        messengerRef.current = messenger;

        // Listen for "preview-ready"
        const off = messenger.on("preview.ready", () => {
            setConnected(true);
            onConnected(messenger);
        });

        return () => {
            off(); // Remove listener
            messenger.dispose();
        };
    }, [iframeRef, onConnected]);

    return connected ? null : <div>Connecting to preview…</div>;
}
