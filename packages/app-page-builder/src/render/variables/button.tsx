import React from "react";
import { ButtonRenderer } from "@webiny/app-page-builder-elements/renderers/button";
import { useElementVariables } from "~/hooks/useElementVariables";

export const ButtonRendererWithVariables = ButtonRenderer.createDecorator(Original => {
    return function ButtonRenderer(props) {
        const variables = useElementVariables(props.element);

        if (!variables.length) {
            return <Original {...props} />;
        }

        // TODO: get variable values using the new data bindings
        const variableValues = { label: undefined, url: undefined };

        return (
            <Original
                {...props}
                inputs={{
                    buttonText: props.inputs?.buttonText ?? variableValues.label,
                    actionHref: props.inputs?.actionHref ?? variableValues.url
                }}
            />
        );
    };
});
