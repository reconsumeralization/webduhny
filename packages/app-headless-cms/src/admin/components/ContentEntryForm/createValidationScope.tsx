import React from "react";

declare global {
    // eslint-disable-next-line
    namespace JSX {
        interface IntrinsicElements {
            "hcms-field-validation-scope": {
                "data-path": string;
                style: React.CSSProperties;
                children: React.ReactNode;
            };
        }
    }
}

const validationScopeStyles = { display: "inherit" };

export const createValidationScope = (path: string) => {
    return function ValidationScope({ children }: { children: React.ReactNode }) {
        return (
            <hcms-field-validation-scope style={validationScopeStyles} data-path={path}>
                {children}
            </hcms-field-validation-scope>
        );
    };
};
