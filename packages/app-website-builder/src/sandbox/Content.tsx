import React from "react";
import randomColor from "randomcolor";
import styled from "@emotion/styled";

const DocumentElement = styled.div`
    padding: 5px;
    border: 1px dashed #333333;
    background-color: ${({ color }) => color};
    margin: 5px;
`;

// Types
type ElementNode = {
    id: string;
    type: string;
    children?: string[];
    component?: {
        name: string;
        options?: Record<string, any>;
    };
    source?: string;
    inputs?: any[];
};

type ElementMap = Record<string, ElementNode>;

interface DocumentRendererProps {
    elements: ElementMap;
    rootId?: string;
}

// Component map – stub implementation
const ComponentMap: Record<string, React.FC<any>> = {
    "Webiny/Text": ({ text }) => <p>{text}</p>,
    "Webiny/BlockRef": ({ blockId }) => <div>[BlockRef: {blockId}]</div>
};

const colorCache: Record<string, string> = {};

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({
    elements,
    rootId = "root"
}) => {
    if (!elements[rootId]) {
        return <div>Invalid root element</div>;
    }

    const renderElement = (id: string): React.ReactNode => {
        const element = elements[id];
        if (!element) {
            return null;
        }

        if (!colorCache[element.id]) {
            colorCache[element.id] = randomColor({ luminosity: "light" });
        }

        const color = colorCache[element.id];

        const { component, children = [] } = element;
        const Component = component?.name ? ComponentMap[component.name] : "div";
        const props = component?.options || {};

        return (
            <DocumentElement data-element-id={element.id} color={color}>
                <Component key={id} {...props}>
                    {children.map(childId => renderElement(childId))}
                </Component>
            </DocumentElement>
        );
    };

    return <>{renderElement(rootId)}</>;
};
