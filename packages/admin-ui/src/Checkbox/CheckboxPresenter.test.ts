import { CheckboxPresenter } from "./CheckboxPresenter";

describe("CheckboxPresenter", () => {
    const onCheckedChange = jest.fn();

    it("should return the compatible `vm` based on props", () => {
        const presenter = new CheckboxPresenter();

        // `label`
        {
            presenter.init({
                onCheckedChange,
                label: "Label"
            });
            expect(presenter.vm.item?.label).toEqual("Label");
            expect(presenter.vm.item?.hasLabel).toEqual(true);
        }

        // `id`
        {
            presenter.init({
                onCheckedChange,
                id: "id"
            });
            expect(presenter.vm.item?.id).toEqual("id");
        }

        // `checked`
        {
            presenter.init({
                onCheckedChange,
                checked: true
            });
            expect(presenter.vm.item?.checked).toBeTruthy();
        }

        // `indeterminate`
        {
            presenter.init({
                onCheckedChange,
                indeterminate: true
            });
            expect(presenter.vm.item?.indeterminate).toBeTruthy();
        }

        // `disabled`
        {
            presenter.init({
                onCheckedChange,
                disabled: true
            });
            expect(presenter.vm.item?.disabled).toBeTruthy();
        }

        // default: only mandatory props
        {
            presenter.init({
                onCheckedChange
            });
            expect(presenter.vm.item).toEqual({
                id: expect.any(String),
                checked: false,
                indeterminate: false,
                disabled: false,
                hasLabel: false
            });
        }
    });

    it("should call `onCheckedChange` callback when `changeChecked` is called", () => {
        const presenter = new CheckboxPresenter();
        presenter.init({ onCheckedChange });
        presenter.changeChecked(true);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});
