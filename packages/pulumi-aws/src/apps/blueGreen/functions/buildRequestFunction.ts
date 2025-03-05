import { existsSync, readFileSync } from "fs";

export interface IBuildRequestFunctionParams {
    storeId: string;
    storeKey: string;
    typeHeader: string;
}

export const buildRequestFunction = ({
    storeId,
    typeHeader,
    storeKey
}: IBuildRequestFunctionParams): string => {
    const target = __dirname + `/request.js`;
    if (!existsSync(target)) {
        throw new Error(`File "${target}" does not exist.`);
    }
    const content = readFileSync(target, "utf8");
    if (!content) {
        throw new Error(`File "${target}" is empty.`);
    }

    return content
        .replace("{BLUE_GREEN_ROUTER_STORE_ID}", storeId)
        .replace("{BLUE_GREEN_ROUTER_STORE_KEY}", storeKey)
        .replace("{BLUE_GREEN_ROUTER_TYPE_HEADER}", typeHeader);
};
