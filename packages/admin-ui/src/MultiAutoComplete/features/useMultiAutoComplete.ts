import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { MultiAutoCompletePrimitiveProps } from "../primitives";
import {
    MultiAutoCompletePresenterAbstraction,
    MultiAutoCompletePresenterParams
} from "./MultiAutoCompletePresenter";
import { container } from "./container";

export const useMultiAutoComplete = (props: MultiAutoCompletePrimitiveProps) => {
    const params: MultiAutoCompletePresenterParams = useMemo(
        () => ({
            allowFreeInput: props.allowFreeInput,
            emptyMessage: props.emptyMessage,
            loadingMessage: props.loadingMessage,
            onOpenChange: props.onOpenChange,
            onValueReset: props.onValueReset,
            onValuesChange: props.onValuesChange,
            options: props.options,
            placeholder: props.placeholder,
            values: props.values
        }),
        [
            props.allowFreeInput,
            props.emptyMessage,
            props.loadingMessage,
            props.onOpenChange,
            props.onValueReset,
            props.onValuesChange,
            props.options,
            props.placeholder,
            props.values
        ]
    );

    const presenter = useMemo(() => {
        return container.resolve(MultiAutoCompletePresenterAbstraction);
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
        vm,
        setSelectedOption: presenter.setSelectedOption,
        removeSelectedOption: presenter.removeSelectedOption,
        searchOption: presenter.searchOption,
        resetSelectedOptions: presenter.resetSelectedOptions,
        setListOpenState: presenter.setListOpenState,
        createOption: presenter.createOption
    };
};
