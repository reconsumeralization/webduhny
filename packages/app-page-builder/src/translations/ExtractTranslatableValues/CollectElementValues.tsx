import React, { useEffect } from "react";
import { ElementRendererInputs } from "@webiny/app-page-builder-elements/contexts/ElementRendererInputs";
import { usePage } from "~/pageEditor";
import {
    TranslatableItem,
    useTranslations
} from "~/translations/ExtractTranslatableValues/TranslationContext";
import { PbEditorElement } from "~/types";
import { ElementInputType } from "@webiny/app-page-builder-elements";

export interface CreateTranslatableItemParams {
    value: any;
    element: PbEditorElement;
    input: {
        name: string;
        type: ElementInputType;
    };
}

export type NewTranslatableItem = Omit<TranslatableItem, "collectionId"> &
    Partial<Pick<TranslatableItem, "collectionId">>;

export interface CreateTranslatableItems {
    (params: CreateTranslatableItemParams): NewTranslatableItem[];
}

export const createElementRendererInputsDecorator = (
    createTranslatableItems: CreateTranslatableItems
) => {
    return ElementRendererInputs.createDecorator(Original => {
        return function CollectElementValues(props) {
            const translations = useTranslations();
            const [page] = usePage();
            const { element, inputs, values } = props;

            useEffect(() => {
                if (!inputs || !translations) {
                    return;
                }

                Object.entries(props.values).forEach(([key, value]) => {
                    if (!value || !inputs[key].isTranslatable()) {
                        return;
                    }

                    const items = createTranslatableItems({
                        element,
                        value,
                        input: {
                            name: key,
                            type: inputs[key].getType()
                        }
                    });

                    items.forEach(({ collectionId, ...item }) => {
                        translations.setTranslationItem({
                            collectionId: collectionId ?? `page:${page.id}`,
                            ...item
                        });
                    });
                });
            }, [element.id, values]);

            return <Original {...props} />;
        };
    });
};
