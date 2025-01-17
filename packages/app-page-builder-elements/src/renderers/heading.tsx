import React from "react";
import { createRenderer } from "~/createRenderer";
import { useRenderer } from "~/hooks/useRenderer";
import { ElementInput } from "~/inputs/ElementInput";
import { isJson } from "~/renderers/isJson";
import { isHtml } from "~/renderers/isHtml";

export const elementInputs = {
    text: ElementInput.create<string>({
        name: "text",
        type: "lexical",
        translatable: true,
        getDefaultValue: ({ element }) => {
            return element.data.text.data.text;
        }
    })
};

export const HeadingRenderer = createRenderer<unknown, typeof elementInputs>(
    () => {
        const { getElement, getInputValues } = useRenderer();
        const inputs = getInputValues<typeof elementInputs>();
        const content = inputs.text || "";
        const element = getElement();

        // This exists for backwards compatibility with older rich-text implementations (Medium).
        const tag = element.data.text?.desktop?.tag || "h1";

        if (isJson(content) || !isHtml(content)) {
            return null;
        }

        return React.createElement(tag, {
            dangerouslySetInnerHTML: { __html: content }
        });
    },
    { inputs: elementInputs }
);
