import { ManifestRenderer } from "~/Manifest/ManifestRenderer";

export class Manifest<TConfig = Record<string, any>> {
    config: TConfig;

    constructor(config: TConfig) {
        this.config = config;
    }

    static async from<TConfig = Record<string,any>>(path: string) {
        const renderedConfig = await ManifestRenderer.render<TConfig>(path);
        return new Manifest(renderedConfig);
    }
}
