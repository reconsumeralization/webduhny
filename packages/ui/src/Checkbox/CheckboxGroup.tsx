import React from "react";
import { FormComponentProps } from "./../types";
import { FormComponent } from "@webiny/admin-ui/Form";

export interface ChildrenRenderProp {
    onChange: (id: string | number) => () => void;
    getValue: (id: string | number) => boolean;
}

type Props = FormComponentProps & {
    // Form element's label.
    label?: string;

    // Form element's description.
    description?: string;

    // An array of Checkbox components.
    children: (props: ChildrenRenderProp) => React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `CheckboxGroup` component from the `@webiny/admin-ui/CheckboxGroup` package instead.
 */
class CheckboxGroup extends React.Component<Props> {
    public override render() {
        const { description, label, validation, validate } = this.props;

        return (
            <FormComponent
                label={label}
                validation={validation}
                note={description}
                validate={validate}
            >
                {this.props.children({
                    onChange: value => {
                        return () => {
                            const values = Array.isArray(this.props.value)
                                ? [...this.props.value]
                                : [];
                            const index = values.indexOf(value);
                            if (index > -1) {
                                values.splice(index, 1);
                            } else {
                                values.push(value);
                            }

                            this.props.onChange && this.props.onChange(values);
                        };
                    },
                    getValue: id => {
                        const values = Array.isArray(this.props.value) ? this.props.value : [];
                        return values.includes(id);
                    }
                })}
            </FormComponent>
        );
    }
}

export default CheckboxGroup;
