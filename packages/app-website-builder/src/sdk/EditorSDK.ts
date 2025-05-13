import { documentStore } from "~/sdk/DocumentStore.js";
import { Messenger, MessageOrigin } from "../messenger";

class EditorSDK {
    private messengerInstance: Messenger | null = null;

    public init(): void {
        const source = new MessageOrigin(window, window.location.origin);
        const target = new MessageOrigin(window.parent, this.getReferrerOrigin());

        this.messengerInstance = new Messenger(source, target, "wb.editor.*");

        this.setupListeners();

        this.messengerInstance.send("preview.ready", true);
    }

    public get messenger(): Messenger | null {
        return this.messengerInstance;
    }

    private getReferrerOrigin(): string {
        try {
            const referrer = new URL(document.referrer);
            return `${referrer.protocol}//${referrer.host}`;
        } catch {
            return "";
        }
    }

    private setupListeners() {
        if (!this.messenger) {
            return;
        }

        this.messenger.on("document.set", data => {
            documentStore.setDocument(data);
        });

        this.messenger.on("element.set", data => {
            documentStore.updateElement(data.id, data.patch);
        });

        this.messenger.on("document.patch", patch => {
            documentStore.applyPatch(patch);
        });
    }
}

export const editorSdk = new EditorSDK();
