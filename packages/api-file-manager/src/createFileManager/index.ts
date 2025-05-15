import type { FileManagerContextObject } from "~/types";
import { createFilesCrud } from "~/createFileManager/files.crud";
import { createSettingsCrud } from "~/createFileManager/settings.crud";
import { createSystemCrud } from "~/createFileManager/system.crud";
import type { FileManagerConfig } from "~/createFileManager/types";

export const createFileManager = (config: FileManagerConfig): FileManagerContextObject => {
    const filesCrud = createFilesCrud(config);
    const settingsCrud = createSettingsCrud(config);
    const systemCrud = createSystemCrud(config);

    return {
        ...filesCrud,
        ...settingsCrud,
        ...systemCrud,
        storage: config.storage
    };
};
