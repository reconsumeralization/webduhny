import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { RangeSliderPrimitiveProps } from "./RangeSliderPrimitive";
import { RangeSliderPrimitivePresenter } from "./RangeSliderPrimitivePresenter";

export const useRangeSliderPrimitive = (props: RangeSliderPrimitiveProps) => {
    const presenter = useMemo(() => new RangeSliderPrimitivePresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValues: presenter.changeValues, commitValues: presenter.commitValues };
};
