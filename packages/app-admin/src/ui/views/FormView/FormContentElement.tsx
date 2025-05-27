import React from "react";
import { UIElement, UiElementRenderProps } from "~/ui/UIElement";
import { SimpleFormContent } from "~/components/SimpleForm";

export class FormContentElement extends UIElement {
    public override render(props: UiElementRenderProps) {
        return <SimpleFormContent>{super.render(props)}</SimpleFormContent>;
    }
}
