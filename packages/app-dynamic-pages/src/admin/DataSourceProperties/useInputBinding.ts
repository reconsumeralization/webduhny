import { useCallback } from "react";
import { useTemplate } from "@webiny/app-page-builder/templateEditor";
import type { PbEditorElement, PbPageTemplateDataBinding } from "@webiny/app-page-builder/types";
import { ElementInputBinding } from "~/dataInjection";
import { useGetElementDataSource } from "~/admin/DataSourceProperties/useGetElementDataSource";

export type InputBindings = Array<PbPageTemplateDataBinding>;

const byElementIdAndName = (id: string, inputName: string) => {
    return (binding: ElementInputBinding) => {
        return binding.getInputName() === inputName && binding.getElementId() === id;
    };
};

export const useInputBinding = (element: PbEditorElement, inputName: string) => {
    const [template, updateTemplate] = useTemplate();
    const { getElementDataSource } = useGetElementDataSource();

    // TODO: ideally, we want this mapping to happen in the `useTemplate` hook.
    const bindings = template.dataBindings.map(binding => ElementInputBinding.create(binding));

    const binding = bindings.find(byElementIdAndName(element.id, inputName));

    const onChange = useCallback(
        async (value: unknown) => {
            const bindingIndex = bindings.findIndex(byElementIdAndName(element.id, inputName));

            if (value === "") {
                // Remove binding.
                return updateTemplate(template => {
                    return {
                        ...template,
                        dataBindings: [
                            ...template.dataBindings.slice(0, bindingIndex),
                            ...template.dataBindings.slice(bindingIndex + 1)
                        ]
                    };
                });
            }

            const elementDataSource = await getElementDataSource(element);

            if (!elementDataSource) {
                console.warn(`DataSource not found for element`, element);
                return;
            }

            const binding: PbPageTemplateDataBinding = {
                dataSource: elementDataSource.name,
                bindFrom: String(value),
                bindTo: `element:${element.id}.${inputName}`
            };

            let newBindings: PbPageTemplateDataBinding[];

            if (bindingIndex > -1) {
                // Update binding.
                newBindings = [
                    ...template.dataBindings.slice(0, bindingIndex),
                    binding,
                    ...template.dataBindings.slice(bindingIndex + 1)
                ];
            } else {
                // Add binding.
                newBindings = [...template.dataBindings, binding];
            }

            updateTemplate(template => {
                return {
                    ...template,
                    dataBindings: newBindings
                };
            });
        },
        [bindings]
    );

    const resetBindings = () => {
        updateTemplate(template => {
            return { ...template, dataBindings: [] };
        });
    };

    return { binding, onChange, resetBindings };
};
