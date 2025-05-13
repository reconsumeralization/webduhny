import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import randomColor from "randomcolor";
import styled from "@emotion/styled";
import { editorSdk } from "~/sdk/index.js";
import { documentStore } from "../sdk/DocumentStore.js";
import set from "lodash/set.js";
import { autorun, toJS } from "mobx";

const DocumentElement = styled.div`
    padding: 5px;
    border: 1px dashed #333333;
    background-color: ${({ color }) => color};
    margin: 5px;
`;

const colorCache: Record<string, string> = {};

// Component map – stub implementation
const ComponentMap: Record<string, React.FC<any>> = {
    "Webiny/Text": ({ text }) => <p>{text}</p>,
    "Webiny/BlockRef": ({ blockId }) => <div>[BlockRef: {blockId}]</div>
};

interface ElementRendererProps {
    id: string;
}

export const ElementRenderer = observer(({ id }: ElementRendererProps) => {
    const [element, setElement] = useState(toJS(documentStore.getElement(id)));

    if (!element) {
        return null;
    }

    if (!colorCache[id]) {
        colorCache[id] = randomColor({ luminosity: "light" });
    }

    useEffect(() => {
        const storeUnsubscribe = autorun(() => {
            const newData = toJS(documentStore.getElement(id));

            setElement(newData);
        });

        const elementPatchUnsubscribe = editorSdk.messenger!.on(`element.patch.${id}`, values => {
            setElement(data => {
                if (!data) {
                    return data;
                }

                const newElement = structuredClone(data);

                Object.keys(values).forEach(key => {
                    set(newElement, key, values[key]);
                });

                return newElement;
            });
        });

        return () => {
            storeUnsubscribe();
            elementPatchUnsubscribe();
        };
    }, []);

    // @ts-ignore 123
    const color = element.component?.options.color ?? colorCache[id];

    const { component, children = [] } = element;
    const Component = component?.name ? ComponentMap[component.name] : "div";
    const props = component?.options || {};

    return (
        <DocumentElement data-element-id={id} color={color}>
            <Component {...props}>
                {children.map(childId => (
                    <ElementRenderer key={childId} id={childId} />
                ))}
            </Component>
        </DocumentElement>
    );
});
