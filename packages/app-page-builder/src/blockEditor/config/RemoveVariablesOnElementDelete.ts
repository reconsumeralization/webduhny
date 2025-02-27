import { useEffect } from "react";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { DeleteElementActionEvent } from "~/editor/recoil/actions";
import type { DeleteElementActionArgsType } from "~/editor/recoil/actions/deleteElement/types";
import type { BlockEditorEventActionCallableState } from "~/blockEditor/types";
import type { PbBlockVariable, PbDataBinding } from "~/types";
import { ElementNode, getDescendantsOfElement } from "~/editor/getDescendantsOfElement";

export const RemoveVariablesOnElementDelete = () => {
    const eventActionHandler = useEventActionHandler<BlockEditorEventActionCallableState>();

    useEffect(() => {
        const offDeleteElementAction = eventActionHandler.on(
            DeleteElementActionEvent,
            async (state, _, args: DeleteElementActionArgsType) => {
                const { element } = args;

                const toDelete = await getDescendantsOfElement(state, element);

                return {
                    state: {
                        ...state,
                        block: {
                            ...state.block,
                            blockVariables: removeElementVariables(
                                toDelete,
                                state.block?.blockVariables ?? []
                            ),
                            dataBindings: removeDataBindings(toDelete, state.block?.dataBindings ?? [])
                        }
                    },
                    actions: []
                };
            }
        );

        return () => {
            offDeleteElementAction();
        };
    }, []);

    return null;
};

const removeElementVariables = (elements: ElementNode[], blockVariables: PbBlockVariable[]) => {
    return blockVariables.filter(variable => {
        return !elements.some(element => variable.elementId === element.id);
    });
};

const removeDataBindings = (elements: ElementNode[], dataBindings: PbDataBinding[]) => {
    return dataBindings.filter(dataBinding => {
        return !elements.some(element => {
            return dataBinding.bindTo.startsWith(`element:${element.id}.`);
        });
    });
};
