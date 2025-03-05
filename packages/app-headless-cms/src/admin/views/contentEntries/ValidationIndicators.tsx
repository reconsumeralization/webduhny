import React, { useEffect } from "react";
import type { FormValidation } from "@webiny/form";
import { makeDecoratable } from "@webiny/react-composition";
import { Global, css } from "@emotion/react";

const defaultClass = css`
    .wby-content-entry-invalid-field {
        border-left: 5px solid red;
        padding-left: 10px;
    }

    // We don't want to add padding, if we're a direct child of an "ul".
    ul > .wby-content-entry-invalid-field {
        padding-left: 0px;
    }
`;

export interface ValidationIndicatorsProps {
    invalidFields: FormValidation;
    className?: string;
}

export const ValidationIndicators = makeDecoratable(
    "ValidationIndicators",
    ({
        invalidFields,
        className = "wby-content-entry-invalid-field"
    }: ValidationIndicatorsProps) => {
        const visualizeDomByPath = (path: string) => {
            const selector = `hcms-field-validation-scope[data-path="${path}"]`;
            const marker = Array.from(document.querySelectorAll(selector).values())[0];
            if (marker) {
                marker.classList.add(className);
            }

            if (path.includes(".")) {
                const paths = path.split(".");
                const parentPath = paths.slice(0, paths.length - 1);
                visualizeDomByPath(parentPath.join("."));
            }
        };

        useEffect(() => {
            document.querySelectorAll(`.${className}`).forEach(el => {
                el.classList.remove(className);
            });

            for (const key of Object.keys(invalidFields)) {
                visualizeDomByPath(key);
            }
        }, [invalidFields]);

        return <Global styles={defaultClass} />;
    }
);
