import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { CheckboxGroupProps } from "./CheckboxGroup";
import { CheckboxGroupPresenter } from "./CheckboxGroupPresenter";

export const useCheckboxGroup = (props: CheckboxGroupProps) => {
    const presenter = useMemo(() => new CheckboxGroupPresenter(), []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(props);
    }, [props]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return { vm, changeChecked: presenter.changeChecked };
};
