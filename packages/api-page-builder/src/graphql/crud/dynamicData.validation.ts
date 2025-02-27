import zod from "zod";

export const dynamicData = {
    dataSources: zod
        .array(
            zod.object({
                name: zod.string(),
                type: zod.string(),
                config: zod.object({}).passthrough()
            })
        )
        .optional(),
    dataBindings: zod
        .array(
            zod.object({
                dataSource: zod.string(),
                bindFrom: zod.string().optional().nullish(),
                bindTo: zod.string()
            })
        )
        .optional(),
    blockVariables: zod
        .array(
            zod.object({
                blockId: zod.string(),
                elementId: zod.string(),
                elementType: zod.string(),
                label: zod.string(),
                inputName: zod.string()
            })
        )
        .optional()
};
