import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { RadioGroupProps } from "./Radio";
import { RadioGroupPresenter } from "./RadioGroupPresenter";

export const useRadioGroup = (props: RadioGroupProps) => {
    const presenter = useMemo(() => new RadioGroupPresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeValue: presenter.changeValue };
};
