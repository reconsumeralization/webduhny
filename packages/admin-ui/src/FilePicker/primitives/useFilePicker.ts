import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { FilePickerPresenter, type FilePickerPresenterParams } from "./presenters";
import type { FilePickerPrimitiveProps } from "~/FilePicker";

type IFilePickerPrimitiveProps = Pick<FilePickerPrimitiveProps, "value">;

export const useFilePicker = (props: IFilePickerPrimitiveProps) => {
    const params: FilePickerPresenterParams = useMemo(
        () => ({
            value: props.value
        }),
        [props.value]
    );

    const presenter = useMemo(() => {
        return new FilePickerPresenter();
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
