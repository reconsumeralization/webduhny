import {
    IMultiAutoCompletePresenter,
    MultiAutoCompletePresenter
} from "./MultiAutoCompletePresenter";
import { MultiAutoCompleteInputPresenter } from "./MultiAutoCompleteInputPresenter";
import { MultiAutoCompleteSelectedOptionPresenter } from "./MultiAutoCompleteSelectedOptionsPresenter";
import { MultiAutoCompleteListOptionsPresenter } from "./MultiAutoCompleteListOptionsPresenter";
import { MultiAutoCompleteTemporaryOptionPresenter } from "~/MultiAutoComplete/primitives/presenters/MultiAutoCompleteTemporaryOptionPresenter";
import { MultiAutoCompletePresenterWithFreeInput } from "~/MultiAutoComplete/primitives/presenters/MultiAutoCompletePresenterWithFreeInput";

describe("MultiAutoCompletePresenterWithFreeInput", () => {
    let presenter: IMultiAutoCompletePresenter;
    const onValuesChange = jest.fn();

    beforeEach(() => {
        const inputPresenter = new MultiAutoCompleteInputPresenter();
        const selectedOptionsPresenter = new MultiAutoCompleteSelectedOptionPresenter();
        const optionsListPresenter = new MultiAutoCompleteListOptionsPresenter();
        const temporaryOptionPresenter = new MultiAutoCompleteTemporaryOptionPresenter();

        const decoretee = new MultiAutoCompletePresenter(
            inputPresenter,
            selectedOptionsPresenter,
            optionsListPresenter
        );
        presenter = new MultiAutoCompletePresenterWithFreeInput(
            temporaryOptionPresenter,
            decoretee
        );
    });

    it("should return the compatible `vm.temporaryOptionVm` based on params", () => {
        // default: no params
        presenter.init({ onValuesChange });
        expect(presenter.vm.temporaryOptionVm.option).toEqual(undefined);
    });

    it("should be able to create new options", () => {
        presenter.init({ onValuesChange });

        // Let's create the first option
        presenter.searchOption("New Option 1");
        presenter.createOption("New Option 1");
        expect(presenter.vm.selectedOptionsVm.isEmpty).toEqual(false);
        expect(presenter.vm.selectedOptionsVm.options).toEqual([
            {
                label: "New Option 1",
                value: "New Option 1",
                disabled: false,
                selected: true,
                separator: false,
                item: null
            }
        ]);
        expect(onValuesChange).toHaveBeenCalledWith(["New Option 1"]);
        expect(presenter.vm.inputVm.value).toEqual("");

        // Let's create the second option
        presenter.searchOption("New Option 2");
        presenter.createOption("New Option 2");
        expect(presenter.vm.selectedOptionsVm.isEmpty).toEqual(false);
        expect(presenter.vm.selectedOptionsVm.options).toEqual([
            {
                label: "New Option 1",
                value: "New Option 1",
                disabled: false,
                selected: true,
                separator: false,
                item: null
            },
            {
                label: "New Option 2",
                value: "New Option 2",
                disabled: false,
                selected: true,
                separator: false,
                item: null
            }
        ]);
        expect(onValuesChange).toHaveBeenCalledWith(["New Option 1", "New Option 2"]);
        expect(presenter.vm.inputVm.value).toEqual("");
    });
});
