import { useEffect, useMemo, useState } from "react";
import { autorun } from "mobx";
import { MultiAutoCompletePrimitiveProps } from "./MultiAutoCompletePrimitive";
import {
    MultiAutoCompleteInputPresenter,
    MultiAutoCompleteListOptionsPresenter,
    MultiAutoCompletePresenter,
    MultiAutoCompletePresenterParams,
    MultiAutoCompletePresenterWithFreeInput,
    MultiAutoCompleteSelectedOptionPresenter
} from "./presenters";
import { MultiAutoCompleteTemporaryOptionPresenter } from "~/MultiAutoComplete/primitives/presenters/MultiAutoCompleteTemporaryOptionPresenter";

export const useMultiAutoComplete = (props: MultiAutoCompletePrimitiveProps) => {
    const params: MultiAutoCompletePresenterParams = useMemo(
        () => ({
            allowFreeInput: props.allowFreeInput,
            emptyMessage: props.emptyMessage,
            loadingMessage: props.loadingMessage,
            options: props.options,
            placeholder: props.placeholder,
            values: props.values,
            onValuesChange: props.onValuesChange,
            onValuesReset: props.onValuesReset,
            onOpenChange: props.onOpenChange
        }),
        [
            props.allowFreeInput,
            props.emptyMessage,
            props.loadingMessage,
            props.options,
            props.placeholder,
            props.values,
            props.onValuesChange,
            props.onValuesReset,
            props.onOpenChange
        ]
    );

    const presenter = useMemo(() => {
        const inputPresenter = new MultiAutoCompleteInputPresenter();
        const optionsListPresenter = new MultiAutoCompleteListOptionsPresenter();
        const selectedOptionsPresenter = new MultiAutoCompleteSelectedOptionPresenter();
        const presenter = new MultiAutoCompletePresenter(
            inputPresenter,
            selectedOptionsPresenter,
            optionsListPresenter
        );

        if (params?.allowFreeInput) {
            const temporaryOptionsPresenter = new MultiAutoCompleteTemporaryOptionPresenter();
            const withPresenter = new MultiAutoCompletePresenterWithFreeInput(
                temporaryOptionsPresenter,
                presenter
            );
            withPresenter.init(params);
            return withPresenter;
        } else {
            presenter.init(params);
            return presenter;
        }
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
        removeSelectedOption: presenter.removeSelectedOption,
        searchOption: presenter.searchOption,
        resetSelectedOptions: presenter.resetSelectedOptions,
        setListOpenState: presenter.setListOpenState,
        createOption: presenter.createOption
    };
};
