import { Project } from "@webiny/project";
import { Manifest } from "./Manifest";

class CompilationResult {
    manifest: Manifest;

    constructor(manifest: Manifest) {
        this.manifest = manifest;
    }
}

export class WC {
    project: Project;

    constructor(cwd?: string) {
        this.project = new Project(cwd);
    }

    async build() {
        const manifest = await this.getManifest();
        return new CompilationResult(manifest);
    }

    async watch() {
        const manifest = await this.getManifest();
    }

    private async getManifest() {
        const manifestPath = this.project.paths.manifestFile;
        return Manifest.from(manifestPath);
    }
}
