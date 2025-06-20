import React from "react";
import { createRoot } from "react-dom/client";
import { Properties, toObject } from "@webiny/react-properties";
import debounce from "debounce";

// @ts-expect-error jsdom types are messing up with the repo, so they're disabled in the root package.json.
import { JSDOM } from "jsdom";

export class ManifestRenderer {
    static async render<TConfig = Record<string, any>>(path: string) {
        const { default: ManifestComponent } = require(path);
        return new Promise<TConfig>(resolve => {
            const onChange = debounce((value: any) => {
                resolve(toObject(value));
            });

            const { window } = new JSDOM(`<div id="root"/>`);
            global.window = window;
            global.document = window.document;

            const root = window.document.getElementById("root");
            const element = (
                <Properties onChange={onChange}>
                    <ManifestComponent />
                </Properties>
            );

            createRoot(root).render(element);
        });
    }
}
