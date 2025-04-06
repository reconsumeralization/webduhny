import React, { useState } from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { useRecoilValue } from "recoil";
import { elementWithChildrenByIdSelector } from "@webiny/app-page-builder/editor/recoil/modules";
import { Element } from "@webiny/app-page-builder-elements/types";
import { ButtonPrimary, ButtonSecondary } from "@webiny/ui/Button";
import { useUpdateElement } from "@webiny/app-page-builder/editor/hooks/useUpdateElement";
import styled from "@emotion/styled";
import { Form } from "@webiny/form";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { useConditionalRulesDialog } from "./useConditionalRulesDialog";
import { createPageElement } from "../../shared/createPageElement";

const Wrapper = styled.div``;

const TopActions = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--mdc-theme-on-background);
    margin-bottom: 10px;
`;

const PagesTabs = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

const ElementsSection = styled.div<{ activePage: number }>`
    & > webiny-form-container > pb-grid {
        display: none;
    }

    ${props =>
        props.activePage !== undefined &&
        `
        & > webiny-form-container > pb-grid:nth-of-type(${props.activePage + 1}) {
            display: block;
        }
    `}
`;

export const FunnelBuilderAdmin = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();
    const updateElement = useUpdateElement();
    const [activePageIndex, setActivePageIndex] = useState(0);

    const elementWithChildren = useRecoilValue(
        elementWithChildrenByIdSelector(element.id)
    ) as Element;

    const addPage = () => {
        updateElement({
            ...element,
            elements: [
                ...element.elements,
                createPageElement({ title: `Page ${element.elements.length + 1}` })
            ]
        });
    };

    const { showDialog: showConditionalRulesDialog } = useConditionalRulesDialog();

    return (
        <Wrapper>
            <Tabs onActivate={index => setActivePageIndex(index)}>
                {element.elements.map((el, index) => {
                    const pageNumber = index + 1;

                    return <Tab label={`Page ${pageNumber}`} key={index} />;
                })}
            </Tabs>

            <ElementsSection activePage={activePageIndex} data-role={"fub-steps-wrapper"}>
                <Form
                    onSubmit={data => {
                        console.log("Form submitted");
                        console.log("dejta", data);
                    }}
                >
                    {() => <Elements element={elementWithChildren} />}
                </Form>
            </ElementsSection>
        </Wrapper>
    );
});
