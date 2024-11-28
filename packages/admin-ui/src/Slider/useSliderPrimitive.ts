import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SliderPrimitiveProps } from "./SliderPrimitive";
import {
    SliderPrimitivePresenter,
    SliderPrimitivePresenterParams
} from "./SliderPrimitivePresenter";

export const useSliderPrimitive = (props: SliderPrimitiveProps) => {
    const params: SliderPrimitivePresenterParams = useMemo(
        () => ({
            min: props.min,
            onValueChange: props.onValueChange,
            onValueCommit: props.onValueCommit,
            showTooltip: props.showTooltip,
            transformValue: props.transformValue,
            value: props.value
        }),
        [
            props.min,
            props.onValueChange,
            props.onValueCommit,
            props.showTooltip,
            props.transformValue,
            props.value
        ]
    );

    const presenter = useMemo(() => {
        const presenter = new SliderPrimitivePresenter();
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

    return { vm, changeValue: presenter.changeValue, commitValue: presenter.commitValue };
};
