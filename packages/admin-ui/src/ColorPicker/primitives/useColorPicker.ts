import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { ColorPickerPrimitiveProps } from "./ColorPickerPrimitive";
import { ColorPickerPresenter, ColorPickerPresenterParams } from "./presenters";

export const useColorPicker = (props: ColorPickerPrimitiveProps) => {
    const params: ColorPickerPresenterParams = useMemo(
        () => ({
            value: props.value,
            onOpenChange: props.onOpenChange,
            onValueChange: props.onValueChange
        }),
        [props.value, props.onOpenChange, props.onValueChange]
    );

    const presenter = useMemo(() => {
        const presenter = new ColorPickerPresenter();
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

    return {
        vm,
        setColor: presenter.setColor,
        setOpen: presenter.setOpen
    };
};
