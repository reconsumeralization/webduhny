import React from "react";
import { useModelField } from "~/admin/components/ModelFieldProvider";

declare global {
    // eslint-disable-next-line
    namespace JSX {
        interface IntrinsicElements {
            "hcms-field-validation-scope": {
                "data-path": string;
                "data-field-type": string;
                "data-field-multiple-values": string;
                "data-field-renderer": string;
                style: React.CSSProperties;
                children: React.ReactNode;
            };
        }
    }
}

const validationScopeStyles = { display: "inherit" };

export const createValidationScope = (path: string) => {
    return function ValidationScope({ children }: { children: React.ReactNode }) {
        const { field } = useModelField();

        if (field.multipleValues === undefined) {
            field.multipleValues = false;
        }

        return (
            <hcms-field-validation-scope
                style={validationScopeStyles}
                data-path={path}
                data-field-type={field.type}
                data-field-multiple-values={String(field.multipleValues)}
                data-field-renderer={String(field.renderer.name)}
            >
                {children}
            </hcms-field-validation-scope>
        );
    };
};
