import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { MultiAutoCompletePrimitiveProps } from "./MultiAutoCompletePrimitive";
import {
    MultiAutoCompletePresenter,
    MultiAutoCompletePresenterParams
} from "./MultiAutoCompletePresenter";
import { MultiAutoCompleteInputPresenter } from "./MultiAutoCompleteInputPresenter";
import { MultiAutoCompleteSelectedOptionsPresenter } from "./MultiAutoCompleteSelectedOptionsPresenter";
import { ListCache } from "./ListCache";
import { CommandOption } from "~/Command";

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
        const inputPresenter = new MultiAutoCompleteInputPresenter();
        const selectedCache = new ListCache<CommandOption>();
        const selectedPresenter = new MultiAutoCompleteSelectedOptionsPresenter(selectedCache);
        const optionsCache = new ListCache<CommandOption>();
        const presenter = new MultiAutoCompletePresenter(
            inputPresenter,
            selectedPresenter,
            optionsCache
        );
        presenter.init(params);
        return presenter;
    }, []);

    const [vm, setVm] = useState(presenter.vm);

    useEffect(() => {
        presenter.init(params);
    }, [presenter]);

    useEffect(() => {
        return autorun(() => {
            setVm(presenter.vm);
        });
    }, [presenter]);

    return {
        vm,
        setSelectedOption: presenter.setSelectedOption,
        removeSelectedOption: presenter.removeSelectedOption,
        setInputValue: presenter.setInputValue,
        resetSelectedOptions: presenter.resetSelectedOptions,
        setListOpenState: presenter.setListOpenState
    };
};
