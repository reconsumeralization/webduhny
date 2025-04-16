import React, { useState } from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { useRecoilValue } from "recoil";
import { elementWithChildrenByIdSelector } from "@webiny/app-page-builder/editor/recoil/modules";
import { Element } from "@webiny/app-page-builder-elements/types";
import styled from "@emotion/styled";
import { Form } from "@webiny/form";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { ContainerAdminEventHandlers } from "./ContainerAdminEventHandlers";

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

export const ContainerAdmin = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();
    const [activePageIndex, setActivePageIndex] = useState(0);
    // TODO
    //    const { getElement } = useRenderer();
    //     const element = getElement();
    //     const elementWithChildren = useElementWithChildren(element.id!) as FunnelBuilderMainElement;
    const elementWithChildren = useRecoilValue(
        elementWithChildrenByIdSelector(element.id)
    ) as Element;

    console.log("cont data", element.data);
    return (
        <div>
            <ContainerAdminEventHandlers />
            <Tabs onActivate={index => setActivePageIndex(index)}>
                {elementWithChildren.elements.map(element => {
                    if (element.data) {
                        return (
                            <Tab
                                key={element.data.fub.page.id}
                                label={element.data.fub.page.title}
                            />
                        );
                    }
                    return null;
                })}
            </Tabs>

            <ElementsSection activePage={activePageIndex} data-role={"fub-steps-wrapper"}>
                <Form
                    onSubmit={data => {
                        console.log("Form submitted.", data);
                    }}
                >
                    {() => <Elements element={elementWithChildren} />}
                </Form>
            </ElementsSection>
        </div>
    );
});
