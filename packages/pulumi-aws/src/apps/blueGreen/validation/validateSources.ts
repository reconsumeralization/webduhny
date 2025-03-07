import { createZodError } from "@webiny/utils/createZodError.js";
import type { IBlueGreenSources } from "../types.js";
import zod from "zod";

const schema = zod
    .object({
        api: zod.string(),
        admin: zod.string(),
        website: zod.string().optional(),
        preview: zod.string().optional()
    })
    .refine(
        values => {
            if (!values.website && values.preview) {
                return false;
            } else if (values.website && !values.preview) {
                return false;
            }
            return true;
        },
        {
            message: "Both website and preview must be set. One cannot be set and other empty."
        }
    );

export const validateSources = (sources: unknown): IBlueGreenSources => {
    const result = schema.safeParse(sources);
    if (result.error) {
        throw createZodError(result.error);
    }
    return {
        ...result.data,
        website: result.data.website,
        preview: result.data.preview
    };
};
