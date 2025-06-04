import type { ICanCreateFolderInRoot } from "./ICanCreateFolderInRoot";

export class CanCreateFolderInRoot implements ICanCreateFolderInRoot {
    execute() {
        return true;
    }
}
