import zod from "zod";

export const createSettingsValidation = zod.object({
    domain: zod.string().optional().default(""),
    reCaptcha: zod
        .object({
            enabled: zod.boolean().optional().default(false),
            siteKey: zod.string().max(100).optional().default(""),
            secretKey: zod.string().max(100).optional().default("")
        })
        .passthrough()
        .default({})
});

export const updateSettingsValidation = zod.object({
    domain: zod.string().optional().default(""),
    reCaptcha: zod
        .object({
            enabled: zod.boolean().optional().default(false),
            siteKey: zod.string().max(100).optional().default(""),
            secretKey: zod.string().max(100).optional().default("")
        })
        .passthrough()
        .default({})
});
