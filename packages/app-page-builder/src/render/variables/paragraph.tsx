import React from "react";
import { ParagraphRenderer } from "@webiny/app-page-builder-elements/renderers/paragraph";
import { useElementVariables } from "~/hooks/useElementVariables";

export const ParagraphRendererWithVariables = ParagraphRenderer.createDecorator(Original => {
    return function ParagraphRenderer(props) {
        const variables = useElementVariables(props.element);

        if (!variables.length) {
            return <Original {...props} />;
        }

        // TODO: get variable values using the new data bindings
        const variableValues = { text: undefined };

        return (
            <Original
                {...props}
                inputs={{
                    text: props.inputs?.text ?? variableValues.text
                }}
            />
        );
    };
});
