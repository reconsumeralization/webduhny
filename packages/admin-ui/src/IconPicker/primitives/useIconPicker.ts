import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { IconPickerParams, IconPickerPresenter } from "./presenters";
import { IconPickerPrimitiveProps } from "./IconPickerPrimitive";

export const useIconPicker = (props: IconPickerPrimitiveProps) => {
    const params: IconPickerParams = useMemo(
        () => ({
            icons: props.icons,
            onChange: props.onChange
        }),
        [props.icons, props.onChange]
    );

    const presenter = useMemo(() => {
        return new IconPickerPresenter();
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params, presenter]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return {
        vm,
        setListOpenState: presenter.setListOpenState,
        searchIcon: presenter.searchIcon,
        setSelectedIcon: presenter.setSelectedIcon
    };
};
