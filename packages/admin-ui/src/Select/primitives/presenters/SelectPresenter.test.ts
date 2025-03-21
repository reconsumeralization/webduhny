import { SelectPresenter } from "./SelectPresenter";

describe("SelectPresenter", () => {
    const onChange = jest.fn();

    it("should return the compatible `vm.selectTrigger` based on props", () => {
        // `placeholder`
        {
            const presenter = new SelectPresenter();
            presenter.init({ onChange, placeholder: "Custom placeholder" });
            expect(presenter.vm.selectTrigger.placeholder).toEqual("Custom placeholder");
        }

        // `displayResetAction`
        {
            const presenter = new SelectPresenter();
            presenter.init({ onChange, displayResetAction: false });
            expect(presenter.vm.selectTrigger.displayResetAction).toEqual(false);
        }

        {
            // default: no props
            const presenter = new SelectPresenter();
            presenter.init({ onChange });
            expect(presenter.vm.selectTrigger.placeholder).toEqual("Select an option");
            expect(presenter.vm.selectTrigger.hasValue).toEqual(false);
        }
    });

    it("should return the compatible `vm.selectOptions` based on props", () => {
        // with `options` as string
        {
            const presenter = new SelectPresenter();
            presenter.init({ onChange, options: ["Option 1", "Option 2"] });
            expect(presenter.vm.selectOptions.options).toEqual([
                {
                    value: "Option 1",
                    label: "Option 1",
                    options: [],
                    disabled: false,
                    separator: false
                },
                {
                    value: "Option 2",
                    label: "Option 2",
                    options: [],
                    disabled: false,
                    separator: false
                }
            ]);
        }

        // with `options` as formatted options
        {
            const presenter = new SelectPresenter();
            presenter.init({
                onChange,
                options: [
                    {
                        value: "option-1",
                        label: "Option 1"
                    },
                    {
                        value: "option-2",
                        label: "Option 2",
                        options: [
                            {
                                value: "option-3",
                                label: "Option 3",
                                options: [{ value: "option-4", label: "Option 4" }]
                            }
                        ]
                    },
                    {
                        value: "option-5",
                        label: "Option 5",
                        disabled: true
                    },
                    {
                        value: "option-6",
                        label: "Option 6",
                        separator: true
                    }
                ]
            });
            expect(presenter.vm.selectOptions.options).toEqual([
                {
                    value: "option-1",
                    label: "Option 1",
                    options: [],
                    disabled: false,
                    separator: false
                },
                {
                    value: "option-2",
                    label: "Option 2",
                    options: [
                        {
                            value: "option-3",
                            label: "Option 3",
                            options: [
                                {
                                    value: "option-4",
                                    label: "Option 4",
                                    options: [],
                                    disabled: false,
                                    separator: false
                                }
                            ],
                            disabled: false,
                            separator: false
                        }
                    ],
                    disabled: false,
                    separator: false
                },
                {
                    value: "option-5",
                    label: "Option 5",
                    options: [],
                    disabled: true,
                    separator: false
                },
                {
                    value: "option-6",
                    label: "Option 6",
                    options: [],
                    disabled: false,
                    separator: true
                }
            ]);
        }
    });

    it("should call `onChange` callback when `changeValue` is called", () => {
        const presenter = new SelectPresenter();
        presenter.init({ onChange, value: "value" });
        presenter.changeValue("value-2");
        expect(onChange).toHaveBeenCalledWith("value-2");
    });

    it("should call `onValueChange` and `onValueReset` callbacks when `resetValue` is called", () => {
        const onValueReset = jest.fn();
        const presenter = new SelectPresenter();
        presenter.init({ onChange, onValueReset, value: "value" });
        presenter.resetValue();
        expect(onChange).toHaveBeenCalledWith("");
        expect(onValueReset).toHaveBeenCalled();
    });
});
