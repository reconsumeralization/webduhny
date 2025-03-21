import {
    createModelGroupPlugin,
    createModelPlugin,
    createModelField
} from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        // Defines a new "E-Commerce" content models group.
        createModelGroupPlugin({
            id: "funnelBuilder",
            name: "Funnel Builder",
            description: " Funnel Builder application-related models.",
            slug: "funnel-builder",
            icon: "fas/layer-group"
        }),

        // Defines a new "Product" content model.
        createModelPlugin({
            name: "Funnel Builder Entry",
            modelId: "funnelBuilderEntry",
            description: "Funnel Builder Entry model.",
            group: {
                id: "funnelBuilder",
                name: "Funnel Builder"
            },
            fields: [
                createModelField({
                    fieldId: "data",
                    type: "long-text",
                    label: "Data (JSON string)",
                    renderer: { name: "long-text-text-area" }
                })
            ],

            layout: [["submissionId"], ["data"]],
            titleFieldId: "" // No title field.
        })
    ];
};
