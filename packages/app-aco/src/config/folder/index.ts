import { Action, ActionConfig } from "./Action";
import { DropConfirmation } from "./DropConfirmation";

export interface FolderConfig {
    actions: ActionConfig[];
    dropConfirmation: boolean;
}

export const Folder = {
    Action,
    DropConfirmation
};
