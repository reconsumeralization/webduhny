import zod from "zod";
import type { NonEmptyArray } from "@webiny/api/types.js";
import type { IResolverRecordBodyItem } from "~/resolver/app/abstractions/ResolverRecord.js";
import { createSystemValidation } from "./system.js";

const convert = (input: IResolverRecordBodyItem[]) => {
    /**
     * We can safely cast as NonEmptyArray<IResolverRecordBodyItem> here because we already validated that the array is not empty.
     */
    return input as NonEmptyArray<IResolverRecordBodyItem>;
};

export const createDetailValidation = () => {
    return zod.object({
        items: zod
            .array(
                zod.object({
                    PK: zod.string(),
                    SK: zod.string(),
                    tableName: zod.string(),
                    command: zod.enum(["update", "put", "delete"])
                })
            )
            .refine(
                values => {
                    return values.length > 0;
                },
                {
                    message: `"items" array must not be empty.`
                }
            )
            .transform(values => {
                return convert(values);
            }),
        source: createSystemValidation()
    });
};
