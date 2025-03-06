import { Action, ActionConfig } from "./Action";
import { createScopedFolderFieldDecorator } from "./FieldDecorator";

export interface FolderConfig {
    actions: ActionConfig[];
}

export const Folder = {
    Action,
    ExtensionField: {
        createDecorator: createScopedFolderFieldDecorator
    }
};
