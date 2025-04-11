import type { FileManagerContext } from "~/types";
import { decorateContext } from "@webiny/api-core";

export const applyThreatScanning = (context: FileManagerContext["fileManager"]) => {
    return decorateContext(context, {
        createFile: decoratee => (data, meta) => {
            return decoratee(
                {
                    ...data,
                    tags: [...data.tags, "threatScanInProgress"]
                },
                meta
            );
        }
    });
};
