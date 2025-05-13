export const elements = {
    root: {
        type: "Webiny/Element",
        id: "root",
        children: ["4ETOAnHNei7", "2B6ROAnHFao3"]
    },
    "4ETOAnHNei7": {
        type: "Webiny/Element",
        id: "4ETOAnHNei7",
        component: {
            name: "Webiny/Text",
            options: {
                text: "Hello!"
            }
        },
        source: "template",
        inputs: [
            {
                inputName: "text",
                label: "Product title",
                target: "component.options.text"
            }
        ]
    },
    "2B6ROAnHFao3": {
        type: "Webiny/Element",
        id: "2B6ROAnHFao3",
        component: {
            name: "Webiny/BlockRef",
            options: {
                blockId: "B6ROAnHFao3",
                inputs: {}
            }
        }
    }
};
