import React from "react";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading";
import { useElementVariables } from "~/hooks/useElementVariables";

export const HeadingRendererWithVariables = HeadingRenderer.createDecorator(Original => {
    return function HeadingRenderer(props) {
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
