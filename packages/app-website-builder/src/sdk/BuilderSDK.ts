import mockPage1 from "~/sandbox/mocks/mockPage1.js";
import { editorSdk } from "./EditorSDK.js";
import { documentStore } from "./DocumentStore.js";

type Page = {
    properties: Record<string, any>;
    elements: Record<string, any>;
};

type BuilderSDKConfig = {
    apiKey: string;
    apiEndpoint?: string;
};

class BuilderSDK {
    private initialized = false;
    private apiKey = "";
    private apiEndpoint = "/api/pages";

    public init(config: BuilderSDKConfig): BuilderSDK {
        if (this.initialized) {
            return this;
        }

        this.apiKey = config.apiKey;
        this.apiEndpoint = config.apiEndpoint || "/api/pages";
        this.initialized = true;

        if (this.isClient() && this.isPreviewMode()) {
            editorSdk.init();
        }

        return this;
    }

    public async getPage(path: string, context?: { preview?: boolean }): Promise<Page | null> {
        // Client-side preview
        if (this.isClient() && this.isPreviewMode()) {
            await documentStore.waitForDocument();
            return documentStore.getDocument();
        }

        console.warn("IMPLEMENT: Loading page from API!");

        // Server-side preview (from Next.js context)
        const isServerPreview = this.isServer() && context?.preview;
        // const res = await fetch(`${this.apiEndpoint}?url=${encodeURIComponent(path)}&preview=${isServerPreview ? "1" : "0"}`);

        return null;
    }

    public listPages() {
        if (this.isClient() && this.isPreviewMode()) {
            return [];
        }

        return [mockPage1];
    }

    // ─── Environment Detection ───────────────────────────────
    public isPreviewMode(): boolean {
        return this.isIframe() || this.getQueryParam("wb.preview") === "1";
    }

    private isClient(): boolean {
        return typeof window !== "undefined";
    }

    private isServer(): boolean {
        return !this.isClient();
    }

    private isIframe(): boolean {
        return this.isClient() && window.parent !== window;
    }

    private getQueryParam(key: string): string | null {
        if (!this.isClient()) {
            return null;
        }

        return new URLSearchParams(window.location.search).get(key);
    }
}

export const builderSdk = new BuilderSDK();
