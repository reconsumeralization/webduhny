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
            emptyMessage: props.emptyMessage,
            loadingMessage: props.loadingMessage,
            onOpenChange: props.onOpenChange,
            onValuesChange: props.onValuesChange,
            onValueReset: props.onValueReset,
            options: props.options,
            placeholder: props.placeholder,
            values: props.values
        }),
        [
            props.options,
            props.values,
            props.placeholder,
            props.emptyMessage,
            props.loadingMessage,
            props.onOpenChange,
            props.onValuesChange,
            props.onValueReset
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
        setListOpenState: presenter.setListOpenState
    };
};
