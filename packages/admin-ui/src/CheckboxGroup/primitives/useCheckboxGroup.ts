import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { CheckboxGroupPrimitiveProps } from "./CheckboxGroupPrimitive";
import { CheckboxGroupPresenter, CheckboxGroupPresenterParams } from "./presenters";

export const useCheckboxGroup = (props: CheckboxGroupPrimitiveProps) => {
    const params: CheckboxGroupPresenterParams = useMemo(
        () => ({
            items: props.items,
            values: props.value || [],
            onCheckedChange: props.onChange
        }),
        [props.items, props.value, props.onChange]
    );

    const presenter = useMemo(() => {
        const presenter = new CheckboxGroupPresenter();
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeChecked: presenter.changeChecked };
};
