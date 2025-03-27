import React from "react";
import {
    Compose,
    createConditionalDecorator,
    CompositionScope,
    GenericComponent,
    Decorator
} from "@webiny/app-admin";
import { FieldElement } from "@webiny/app-headless-cms-common";

export type FieldProps = React.ComponentProps<typeof FieldElement>;

export interface FieldDecoratorProps {
    id?: string;
    modelIds?: string[];
}

export interface FolderFieldDecoratorParams {
    scope?: string;
    shouldDecorate: (decoratorProps: FieldDecoratorProps, componentProps: FieldProps) => boolean;
}

export const createFolderFieldDecoratorFactory =
    ({ scope = "*", shouldDecorate }: FolderFieldDecoratorParams) =>
    (decorator: Decorator<GenericComponent<FieldProps>>) => {
        return function FieldDecorator(props: FieldDecoratorProps) {
            const conditionalDecorator = createConditionalDecorator(
                shouldDecorate,
                decorator,
                props
            );

            return (
                <CompositionScope name={scope}>
                    <CompositionScope name={"aco.folderDetails.extensionFields"}>
                        <Compose component={FieldElement} with={conditionalDecorator} />
                    </CompositionScope>
                </CompositionScope>
            );
        };
    };
