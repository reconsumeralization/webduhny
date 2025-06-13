import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { SteppedProgressPresenter, type SteppedProgressPresenterParams } from "./presenters";
import type { SteppedProgressProps } from "./SteppedProgress";

export const useSteppedProgress = (props: SteppedProgressProps) => {
    const params: SteppedProgressPresenterParams = useMemo(
        () => ({
            items: props.items
        }),
        [props.items]
    );

    const presenter = useMemo(() => {
        return new SteppedProgressPresenter();
    }, []);

    useEffect(() => {
        presenter.init(params);
    }, [params]);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm };
};
