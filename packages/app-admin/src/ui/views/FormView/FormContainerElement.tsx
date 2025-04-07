import React from "react";
import classNames from "classnames";
import { UIElement, UIElementConfig, UiElementRenderProps } from "~/ui/UIElement";
import { SimpleForm } from "~/components/SimpleForm";

interface FormContainerConfig extends UIElementConfig {
    testId?: string;
    noElevation?: boolean;
    className?: string;
}

export class FormContainerElement extends UIElement<FormContainerConfig> {
    public constructor(id: string, config: FormContainerConfig) {
        super(id, config);
        this.useGrid(false);
    }

    public override render(props: UiElementRenderProps) {
        const children = super.render(props);

        return (
            <SimpleForm
                className={classNames("webiny-data-list", this.config.className)}
                data-testid={this.config.testId}
            >
                {children}
            </SimpleForm>
        );
    }
}
