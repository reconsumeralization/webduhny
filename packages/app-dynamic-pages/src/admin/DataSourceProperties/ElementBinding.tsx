import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";
import { useActiveElement } from "@webiny/app-page-builder/editor";
import { Input } from "@webiny/ui/Input";
import { PbEditorElement } from "@webiny/app-page-builder/types";
import { useInputBinding } from "./useInputBinding";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";

const { Ui } = TemplateEditorConfig;

export interface OnElementTypeProps {
    elementType: string;
    children: React.ReactNode;
}

const OnElementType = ({ elementType, children }: OnElementTypeProps) => {
    const [element] = useActiveElement();

    if (element?.type === elementType) {
        return <>{children}</>;
    }

    return null;
};

export interface ElementInputProps {
    elementType: string;
    inputName: string;
    label: string;
}

export const ElementBinding = ({ elementType, inputName, label }: ElementInputProps) => {
    return (
        <Ui.Sidebar.Element
            name={`elementInput:${elementType}:${inputName}`}
            group={"dataSettings"}
            element={
                <OnElementType elementType={elementType}>
                    <ElementInputUi inputName={inputName} label={label} />
                </OnElementType>
            }
        />
    );
};

interface ElementInputUiProps {
    inputName: string;
    label: string;
}

const ElementInputUi = ({ inputName, label }: ElementInputUiProps) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { binding, onChange, resetBindings } = useInputBinding(element, inputName);
    const value = binding ? binding.getSource() : "";

    return (
        <>
            <DelayedOnChange value={value} onChange={onChange}>
                {({ value, onChange }) => <Input label={label} value={value} onChange={onChange} />}
            </DelayedOnChange>
            <button onClick={() => resetBindings()}>Reset All Bindings</button>
        </>
    );
};
