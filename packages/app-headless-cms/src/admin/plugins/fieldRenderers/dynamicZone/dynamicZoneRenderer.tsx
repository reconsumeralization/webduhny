import React from "react";
import { css } from "@emotion/css";
import {
    BindComponent,
    BindComponentRenderProp,
    CmsModel,
    CmsModelField,
    CmsModelFieldRendererPlugin,
    CmsModelFieldRendererProps
} from "~/types";
import { SingleValueDynamicZone } from "./SingleValueDynamicZone";
import { MultiValueDynamicZone } from "./MultiValueDynamicZone";
import { AccordionRenderSettings, getAccordionRenderSettings } from "../AccordionRenderSettings";
import { makeDecoratable } from "@webiny/react-composition";
import { Accordion, FormComponentErrorMessage } from "@webiny/admin-ui";

const noBottomPadding = css`
    > .webiny-ui-accordion-item__content {
        padding-bottom: 0 !important;
    }
`;

export type DynamicZoneContainerProps = {
    field: CmsModelField;
    getBind: (index?: number, key?: string) => BindComponent;
    contentModel: CmsModel;
    bind: BindComponentRenderProp;
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
    actions?: JSX.Element;
};

export const DynamicZoneContainer = makeDecoratable(
    "DynamicZoneContainer",
    (props: DynamicZoneContainerProps) => {
        const {
            field,
            bind: {
                validation: { isValid, message }
            },
            title = field.label,
            description = field.helpText,
            className,
            children
        } = props;

        const defaultClassName = field.multipleValues ? noBottomPadding : undefined;
        const { open } = getAccordionRenderSettings(field);

        return (
            <>
                <Accordion>
                    <Accordion.Item
                        title={title}
                        description={description}
                        className={className || defaultClassName}
                        defaultOpen={open}
                        actions={props.actions ?? null}
                    >
                        {children}
                    </Accordion.Item>
                </Accordion>
                {isValid === false && <FormComponentErrorMessage text={message} />}
            </>
        );
    }
);

const DynamicZoneContent = ({ field, getBind, contentModel }: CmsModelFieldRendererProps) => {
    const templates = field.settings?.templates || [];
    if (!templates.length) {
        console.info(
            `Skipping "${field.fieldId}" field. There are no templates defined for this dynamic zone.`
        );
        return null;
    }

    const Bind = getBind();

    const Component = field.multipleValues ? MultiValueDynamicZone : SingleValueDynamicZone;

    return (
        <Bind>
            {bind => {
                return (
                    <Bind.ValidationContainer>
                        <DynamicZoneContainer
                            field={field}
                            bind={bind}
                            getBind={getBind}
                            contentModel={contentModel}
                        >
                            <Component
                                bind={bind}
                                field={field}
                                getBind={getBind}
                                contentModel={contentModel}
                            />
                        </DynamicZoneContainer>
                    </Bind.ValidationContainer>
                );
            }}
        </Bind>
    );
};

export const dynamicZoneFieldRenderer: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-dynamic-zone",
    renderer: {
        rendererName: "dynamicZone",
        name: "Dynamic Zone",
        description: "Renders a dynamic zone.",
        canUse({ field }) {
            return field.type === "dynamicZone";
        },
        render(props) {
            return <DynamicZoneContent {...props} />;
        },
        renderSettings({ field }) {
            return <AccordionRenderSettings field={field} />;
        }
    }
};
