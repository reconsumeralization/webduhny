import { createModelGroupPlugin, createModelPlugin } from "@webiny/api-serverless-cms";
import { createModelField } from "@webiny/api-headless-cms";

export const createModels = () => {
    return [
        // Defines a new "E-Commerce" content models group.
        createModelGroupPlugin({
            id: "ecommerce",
            name: "E-Commerce",
            description: "E-Commerce content model group",
            slug: "e-commerce",
            icon: "fas/shopping-cart"
        }),

        // Defines a new "Product" content model.
        createModelPlugin({
            name: "Product",
            modelId: "product",
            description: "Product content model",
            group: {
                id: "ecommerce",
                name: "E-Commerce"
            },
            fields: [
                createModelField({
                    fieldId: "name",
                    type: "text",
                    label: "name",
                    helpText: "A short product name",
                    renderer: { name: "text-input" },
                    validation: [
                        {
                            name: "required",
                            message: "Value is required."
                        }
                    ]
                }),
                createModelField({
                    fieldId: "productSku",
                    type: "text",
                    label: "SKU",
                    placeholderText: "SKU = Stock Keeping Unit",
                    renderer: { name: "text-input" }
                }),
                createModelField({
                    fieldId: "productPrice",
                    type: "number",
                    label: "Price",
                    renderer: { name: "text-input" }
                })
            ],
            layout: [["name"], ["productSku", "productPrice"]],
            titleFieldId: "name"
        })
    ];
};
