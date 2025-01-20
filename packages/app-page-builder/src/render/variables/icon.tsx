import React from "react";
import { IconRenderer } from "@webiny/app-page-builder-elements/renderers/icon";
import { useElementVariables } from "~/hooks/useElementVariables";

export const IconRendererWithVariables = IconRenderer.createDecorator(Original => {
    return function ButtonRenderer(props) {
        const variables = useElementVariables(props.element);

        if (!variables.length) {
            return <Original {...props} />;
        }

        // TODO: get variable values using the new data bindings
        const variableValues = { markup: undefined };

        return (
            <Original
                {...props}
                inputs={{
                    markup: props.inputs?.markup ?? variableValues.markup
                }}
            />
        );
    };
});
