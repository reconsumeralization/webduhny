import { ProjectPaths } from "~/ProjectPaths";

export class Project {
    paths: ProjectPaths;

    constructor(cwd?: string) {
        this.paths = new ProjectPaths(cwd);
    }
}
