import { applyPatch as jsonPatchApply, Operation } from "fast-json-patch";
import { makeAutoObservable, runInAction, observable } from "mobx";
import type { Document } from "~/types";

class DocumentStore {
    private document: Document | null = null;
    private documentReady = false;
    private readyResolvers: (() => void)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setDocument(doc: { properties: any; elements: Record<string, any> }) {
        runInAction(() => {
            this.document = observable(doc);
            this.documentReady = true;
            this.readyResolvers.forEach(fn => fn());
            this.readyResolvers = [];
        });
    }

    getDocument() {
        return this.document;
    }

    getElement(id: string) {
        if (!this.document) {
            return null;
        }

        return this.document.elements[id];
    }

    updateElement(id: string, patch: Partial<any>) {
        if (!this.document) {
            return;
        }

        const current = this.document.elements[id];
        if (current) {
            this.document.elements[id] = { ...current, ...patch };
        }
    }

    applyPatch(patch: Operation[]) {
        runInAction(() => {
            jsonPatchApply(this.document, patch, false, true);
        });
    }

    async waitForDocument(): Promise<Document> {
        if (this.documentReady) {
            return this.document as Document;
        }

        return new Promise(resolve => {
            this.readyResolvers.push(() => {
                resolve(this.document as Document);
            });
        });
    }
}

export const documentStore = new DocumentStore();
