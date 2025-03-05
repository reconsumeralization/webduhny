import React, { useEffect } from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { Extensions } from "./Extensions";
import "./App.scss";
import type { FormValidation } from "@webiny/form";

const ValidationRenderer = ({ invalidFields }: { invalidFields: FormValidation }) => {
    const visualizeDomByPath = (path: string) => {
        const selector = `hcms-model-field-element[data-path="${path}"]`;
        const marker = Array.from(document.querySelectorAll(selector).values()).pop();
        if (marker) {
            const domElement = marker.nextSibling as HTMLElement;
            if (domElement) {
                // Mark invalid element
                domElement.classList.add("invalid-field");
            }
        }

        if (path.includes(".")) {
            const paths = path.split(".");
            const parentPath = paths.slice(0, paths.length - 1);
            visualizeDomByPath(parentPath.join("."));
        }
    };

    useEffect(() => {
        document.querySelectorAll(".invalid-field").forEach(el => {
            el.classList.remove("invalid-field");
        });

        for (const key of Object.keys(invalidFields)) {
            visualizeDomByPath(key);
        }
    }, [invalidFields]);

    return null;
};

const ShowValidationErrors = ContentEntryEditorConfig.ContentEntry.createDecorator(Original => {
    return function WithValidation(props) {
        return <Original {...props} ValidationRenderer={ValidationRenderer} />;
    };
});

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <Extensions />
            <ContentEntryEditorConfig>
                <ShowValidationErrors />
            </ContentEntryEditorConfig>
        </Admin>
    );
};
