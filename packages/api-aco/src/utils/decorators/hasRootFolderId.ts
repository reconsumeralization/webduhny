import isPlainObject from "lodash/isPlainObject";
import { isPageModel } from "~/utils/decorators/isPageModel";
import { CmsEntryListWhere, CmsModel } from "@webiny/api-headless-cms/types";
import { ROOT_FOLDER } from "~/constants";

interface Params {
    model: CmsModel;
    where: CmsEntryListWhere | undefined;
}

export const hasRootFolderId = ({ model, where }: Params): boolean => {
    if (!where) {
        return false;
    }

    const key = isPageModel(model) ? "location" : "wbyAco_location";
    const location = where[key];

    if (typeof location === "object" && location !== null && isPlainObject(location)) {
        return (location as Record<string, any>).folderId === ROOT_FOLDER;
    }

    return false;
};
