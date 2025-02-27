import { PbDataBinding } from "~/types";
import { ElementInputBinding } from "~/dataInjection";

export const remapDataBindingToBlock = (
    dataBinding: PbDataBinding,
    newBlockId: string
): PbDataBinding => {
    const binding = ElementInputBinding.create(dataBinding);
    const parts = binding.getElementId().split("#");
    const elementId = parts.pop();
    binding.setElementId(`${newBlockId}#${elementId}`);

    return binding.toPlainObject();
};
