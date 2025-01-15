import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { AutoCompletePrimitiveProps } from "./AutoCompletePrimitive";
import {
    AutoCompletePresenter,
    AutoCompletePresenterParams,
    AutoCompleteInputPresenter,
    AutoCompleteListOptionsPresenter
} from "./presenters";

export const useAutoComplete = (props: AutoCompletePrimitiveProps) => {
    const params: AutoCompletePresenterParams = useMemo(
        () => ({
            options: props.options,
            value: props.value,
            placeholder: props.placeholder,
            emptyMessage: props.emptyMessage,
            loadingMessage: props.loadingMessage,
            onOpenChange: props.onOpenChange,
            onValueChange: props.onValueChange,
            onValueReset: props.onValueReset,
            displayResetAction: props.displayResetAction
        }),
        [
            props.options,
            props.value,
            props.placeholder,
            props.emptyMessage,
            props.loadingMessage,
            props.onOpenChange,
            props.onValueChange,
            props.onValueReset,
            props.displayResetAction
        ]
    );

    const presenter = useMemo(() => {
        const inputPresenter = new AutoCompleteInputPresenter();
        const optionsListPresenter = new AutoCompleteListOptionsPresenter();
        const presenter = new AutoCompletePresenter(inputPresenter, optionsListPresenter);
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [params, presenter]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return {
        vm,
        setSelectedOption: presenter.setSelectedOption,
        searchOption: presenter.searchOption,
        resetSelectedOption: presenter.resetSelectedOption,
        setListOpenState: presenter.setListOpenState
    };
};
