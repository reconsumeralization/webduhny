import findUp from "find-up";
import path from "path";

const WEBINY_CONFIG_TSX_FILE = "webiny.config.tsx";
const DOT_WEBINY_FOLDER = ".webiny";

export class ProjectPaths {
    rootFolder: string;
    dotWebinyFolder: string;
    manifestFile: string;

    constructor(cwd?: string) {
        const webinyConfigTsxPath = findUp.sync(WEBINY_CONFIG_TSX_FILE, { cwd });
        if (!webinyConfigTsxPath) {
            throw new Error(`Cannot find project directory: ${cwd}`);
        }

        this.rootFolder = path.dirname(webinyConfigTsxPath);
        this.manifestFile = webinyConfigTsxPath;
        this.dotWebinyFolder = path.join(this.rootFolder, DOT_WEBINY_FOLDER);
    }
}
