import { PbPageTemplateDataBinding } from "@webiny/app-page-builder/types";

export class ElementInputBinding {
    private binding: PbPageTemplateDataBinding;
    private readonly elementId: string;
    private readonly inputName: string;

    private constructor(binding: PbPageTemplateDataBinding) {
        this.binding = binding;
        const [elementId, inputName] = binding.bindTo.replace("element:", "").split(".");
        this.elementId = elementId;
        this.inputName = inputName;
    }

    static create(binding: PbPageTemplateDataBinding) {
        return new ElementInputBinding(binding);
    }

    getDataSource() {
        return this.binding.dataSource;
    }

    getElementId() {
        return this.elementId;
    }

    getInputName() {
        return this.inputName;
    }

    getSource() {
        return this.binding.bindFrom;
    }
}
