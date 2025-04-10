import zod from "zod";

const baseValidation = zod.object({
    title: zod.string().min(1).max(100),
    description: zod.string().max(100).optional(),
    items: zod.array(zod.object({}).passthrough()).optional()
});

export const createMenuCreateValidation = () => {
    return baseValidation.extend({
        slug: zod.string().min(1).max(100),
        createdOn: zod.date().optional(),
        createdBy: zod
            .object({
                id: zod.string(),
                type: zod.string(),
                displayName: zod.string().nullable()
            })
            .optional()
    });
};

export const createMenuUpdateValidation = () => {
    return baseValidation.partial();
};
