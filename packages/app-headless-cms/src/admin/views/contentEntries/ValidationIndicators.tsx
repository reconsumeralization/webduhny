import React, { useEffect } from "react";
import type { FormValidation } from "@webiny/form";
import { makeDecoratable } from "@webiny/react-composition";
import { Global, css } from "@emotion/react";

const errorColor = `red`;

const errorTitleMixin = `
    content: "⚠️";
    margin-right: 5px;
`;

const errorBorderMixin = `
    border-left: 5px solid ${errorColor};
    padding-left: 10px;
    border-top-left-radius: 5px; 
    border-bottom-left-radius: 5px;
    overflow: hidden; 
`;

const defaultClass = css`
    // default behavior for error fields
    .wby-content-entry-invalid-field {
        ${errorBorderMixin}
    }

    // reset the default behavior for fields that we want to manually control
    .wby-content-entry-invalid-field[data-field-type="text"],
    .wby-content-entry-invalid-field[data-field-type="long-text"],
    .wby-content-entry-invalid-field[data-field-type="dynamicZone"],
    .wby-content-entry-invalid-field[data-field-type="object"],
    .wby-content-entry-invalid-field[data-field-type="ref"],
    .wby-content-entry-invalid-field[data-field-type="file"] {
        border: none;
        padding-left: 0;
        border-radius: 0;
    }

    // short text error
    // long text error
    .wby-content-entry-invalid-field[data-field-type="text"],
    .wby-content-entry-invalid-field[data-field-type="long-text"] {
        &[data-field-multiple-values="false"] > label,
        &[data-field-multiple-values="true"] > hcms-parent-field-provider,
        > label {
            ${errorBorderMixin}
            .mdc-floating-label {
                left: 12px;
            }

            .mdc-floating-label::before {
                ${errorTitleMixin}
            }

            textarea {
                padding-left: 0;
            }
        }

        &[data-field-multiple-values="true"] > hcms-parent-field-provider {
            display: block;
        }
        &[data-field-multiple-values="true"] {
            h5::before {
                ${errorTitleMixin}
            }
        }
    }

    // reference field
    .wby-content-entry-invalid-field[data-field-type="ref"][data-field-multiple-values="false"] {
        h3::before {
            ${errorTitleMixin}
        }

        ${errorBorderMixin}

        .wby-content-entry-invalid-field[data-field-type="dynamicZone"] {
            padding-left: 0px;
        }
    }

    // dynamic zone
    .wby-content-entry-invalid-field[data-field-type="dynamicZone"] {
        ul > div > li::before {
            ${errorTitleMixin}
        }

        ${errorBorderMixin}

        .wby-content-entry-invalid-field[data-field-type="dynamicZone"] {
            padding-left: 0px;
        }

        hcms-parent-field-provider .wby-content-entry-invalid-field {
            li > .webiny-ui-accordion-item__title {
                font-weight: bold;
                color: ${errorColor};
            }
        }
    }

    // object field
    .wby-content-entry-invalid-field[data-field-type="object"] {
        h5::before,
        ul > div > li::before {
            ${errorTitleMixin}
        }

        hcms-parent-field-provider {
            ${errorBorderMixin}

            // object field (multiple values)
            .wby-content-entry-invalid-field {
                border: none;
                padding-left: 0;
                .accordion-title > span {
                    font-weight: bold;
                    color: ${errorColor};
                    ::before {
                        ${errorTitleMixin}
                    }
                }
            }
        }
    }

    .wby-content-entry-invalid-field[data-field-type="ref"][data-field-multiple-values="false"],
    .wby-content-entry-invalid-field[data-field-type="dynamicZone"],
    .wby-content-entry-invalid-field[data-field-type="object"][data-field-multiple-values="true"] {
        ${errorBorderMixin}

        .wby-content-entry-invalid-field[data-field-type="dynamicZone"] {
            padding-left: 0px;
        }
    }

    // file error
    .wby-content-entry-invalid-field[data-field-type="file"][data-field-multiple-values="false"]
        > div
        > div:first-child {
        > span::before {
            ${errorTitleMixin}
        }

        ${errorBorderMixin}
    }

    .wby-content-entry-invalid-field > .webiny-ui-accordion {
        margin-left: -10px;
    }

    .webiny-ui-accordion:has(.wby-content-entry-invalid-field) {
        border-radius: 5px;
    }

    .wby-content-entry-invalid-field .webiny-ui-accordion-item {
        border-radius: 5px;
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
