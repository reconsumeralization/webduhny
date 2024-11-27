import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SliderProps } from "./Slider";
import { SliderPrimitivePresenter } from "./SliderPrimitivePresenter";
import { SliderPresenter } from "./SliderPresenter";

export const useSlider = (props: SliderProps) => {
    const presenter = useMemo(() => {
        const sliderPrimitivePresenter = new SliderPrimitivePresenter();
        return new SliderPresenter(sliderPrimitivePresenter);
    }, []);

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
