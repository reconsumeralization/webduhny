import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import {
    MultiFilePickerPresenter,
    type MultiFilePickerPresenterParams
} from "./presenters/MultiFilePickerPresenter";
import type { MultiFilePickerPrimitiveProps } from "~/MultiFilePicker";

type IMultiFilePickerPrimitiveProps = Pick<MultiFilePickerPrimitiveProps, "values">;

export const useMultiFilePicker = (props: IMultiFilePickerPrimitiveProps) => {
    const params: MultiFilePickerPresenterParams = useMemo(
        () => ({
            values: props.values
        }),
        [props.values]
    );

    const presenter = useMemo(() => {
        const presenter = new MultiFilePickerPresenter();
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
        vm
    };
};
