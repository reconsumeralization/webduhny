import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { CheckboxProps } from "./Checkbox";
import { CheckboxPresenter } from "./CheckboxPresenter";

export const useCheckbox = (props: CheckboxProps) => {
    const presenter = useMemo(() => new CheckboxPresenter(), []);

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
