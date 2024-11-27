import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SliderPrimitiveProps } from "./SliderPrimitive";
import { SliderPrimitivePresenter } from "./SliderPrimitivePresenter";

export const useSliderPrimitive = (props: SliderPrimitiveProps) => {
    const presenter = useMemo(() => new SliderPrimitivePresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValue: presenter.changeValue, commitValue: presenter.commitValue };
};
