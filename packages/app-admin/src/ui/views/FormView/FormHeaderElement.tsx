import React from "react";
import { UIElement, UIElementConfig } from "~/ui/UIElement";
import { FormElementRenderProps } from "~/ui/elements/form/FormElement";
import { SimpleFormHeader } from "~/components/SimpleForm";
import { Icon } from "@webiny/admin-ui";

interface FormHeaderConfig extends UIElementConfig {
    getTitle(props: FormElementRenderProps): string;
    icon?: React.ReactElement;
}

export class FormHeaderElement extends UIElement<FormHeaderConfig> {
    public constructor(id: string, config: FormHeaderConfig) {
        super(id, config);

        this.useGrid(false);
    }

    public setIcon(icon: React.ReactElement) {
        this.config.icon = icon;
    }

    public addAction(element: UIElement) {
        this.addElement(element);
    }

    public override render(props: FormElementRenderProps): React.ReactNode {
        const { icon, getTitle } = this.config;

        return (
            <SimpleFormHeader
                title={
                    <>
                        {icon && <Icon label={"Icon"} icon={icon} />}
                        {getTitle(props)}
                    </>
                }
            >
                {super.render(props)}
            </SimpleFormHeader>
        );
    }
}
