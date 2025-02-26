// @ts-nocheck This will be removed.
import React, { useCallback, useMemo } from "react";
import { css } from "emotion";
import { plugins } from "@webiny/plugins";
import { useActiveElement } from "~/editor/hooks/useActiveElement";
import { Typography } from "@webiny/ui/Typography";
import {PbBlockVariable, PbEditorElement, PbEditorPageElementVariableRendererPlugin} from "~/types";

const wrapperStyle = css({
    padding: "16px",
    display: "grid",
    rowGap: "20px"
});

const labelStyle = css({
    marginBottom: "8px",
    "& span": {
        color: "var(--mdc-theme-text-primary-on-background)"
    }
});

// TODO: Fetch block variables and render inputs using renderers for each input type.
export const VariableSettings = () => {
    const [element] = useActiveElement<PbEditorElement>();

    const variableRenderers = useMemo(() => {
        return plugins.byType<PbEditorPageElementVariableRendererPlugin>(
            "pb-editor-page-element-variable-renderer"
        );
    }, []);

    const renderVariableInput = useCallback(
        (variable: PbBlockVariable) => {
            const renderer = variableRenderers.find(plugin => plugin.elementType === variable.type);
            if (!renderer) {
                return null;
            }
            return renderer.renderVariableInput(variable.id);
        },
        [variableRenderers]
    );

    const variables = element.data.variables;

    if (!variables) {
        return <span>BaseVariableSettings!</span>
        return null;
    }

    return (
        <div className={wrapperStyle}>
            {variables.map((variable, index) => (
                <div key={index}>
                    <div className={labelStyle}>
                        <Typography use={"body2"}>{variable.label}</Typography>
                    </div>
                    {renderVariableInput(variable)}
                </div>
            ))}
        </div>
    );
};
