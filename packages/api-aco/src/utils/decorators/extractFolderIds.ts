import isPlainObject from "lodash/isPlainObject";
import uniq from "lodash/uniq";
import { CmsEntryListWhere } from "@webiny/api-headless-cms/types";
import { ROOT_FOLDER } from "~/constants";

interface Params {
    where: CmsEntryListWhere | undefined;
}

export const extractFolderIds = ({ where }: Params): string[] => {
    if (!where) {
        return [];
    }

    const targetKeys = ["location", "wbyAco_location"];
    const folderIds: string[] = [];

    const traverseObject = (obj: object) => {
        if (!isPlainObject(obj)) {
            return;
        }

        for (const [key, value] of Object.entries(obj)) {
            if (targetKeys.includes(key) && isPlainObject(value)) {
                for (const [subKey, subValue] of Object.entries(value)) {
                    if (subKey.startsWith("folderId")) {
                        if (typeof subValue === "string") {
                            folderIds.push(subValue);
                        }
                        if (Array.isArray(subValue)) {
                            folderIds.push(...subValue);
                        }
                    }
                }
            }

            if (isPlainObject(value) || Array.isArray(value)) {
                traverseObject(value);
            }
        }
    };

    traverseObject(where);

    return uniq(folderIds).filter(id => id !== ROOT_FOLDER);
};
