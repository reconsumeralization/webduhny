import type { PbEditorElement } from "@webiny/app-page-builder/types";
import { useGetElement } from "@webiny/app-page-builder/editor";
import { useDocumentDataSource, useTemplate } from "@webiny/app-page-builder/templateEditor";
import { ElementInputBinding } from "~/dataInjection";

const getDataSourceFromBindings = async (
    getElement: (id: string) => Promise<PbEditorElement | null>,
    bindings: ElementInputBinding[],
    element: PbEditorElement
): Promise<string | undefined> => {
    const maybeBinding = bindings.find(binding => {
        return binding.getElementId() === element.id;
    });

    if (maybeBinding) {
        return maybeBinding.getDataSource();
    }

    if (!element.parent) {
        return undefined;
    }

    const parent = await getElement(element.parent);
    if (!parent) {
        return undefined;
    }

    return getDataSourceFromBindings(getElement, bindings, parent);
};

export const useGetElementDataSource = () => {
    const getElement = useGetElement();
    const [template] = useTemplate();
    const { getDataSource } = useDocumentDataSource();

    const getElementDataSource = async (element: PbEditorElement) => {
        // First, we check if there's a dataSource dedicated to the requested element.
        const dedicatedDataSource = template.dataSources.find(dataSource => {
            return dataSource.name === `element:${element.id}`;
        });

        if (dedicatedDataSource) {
            return dedicatedDataSource;
        }

        // Then we proceed with the lookup through the element tree.
        const bindings = template.dataBindings.map(binding => ElementInputBinding.create(binding));
        const dataSource = await getDataSourceFromBindings(getElement, bindings, element);

        if (dataSource) {
            return getDataSource(dataSource);
        }

        // Fall back to "main" dataSource.
        return getDataSource("main");
    };

    return { getElementDataSource };
};
