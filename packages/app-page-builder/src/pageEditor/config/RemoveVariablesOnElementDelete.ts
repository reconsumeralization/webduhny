import { useEffect } from "react";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { DeleteElementActionEvent } from "~/editor/recoil/actions";
import type { DeleteElementActionArgsType } from "~/editor/recoil/actions/deleteElement/types";
import type {PbBlockVariable, PbDataBinding, PbEditorElement} from "~/types";
import { ElementNode, getDescendantsOfElement } from "~/editor/getDescendantsOfElement";
import { PageEditorEventActionCallableState } from "~/pageEditor/types";

export const RemoveVariablesOnElementDelete = () => {
    const eventActionHandler = useEventActionHandler<PageEditorEventActionCallableState>();

    useEffect(() => {
        const offDeleteElementAction = eventActionHandler.on(
            DeleteElementActionEvent,
            async (state, _, args: DeleteElementActionArgsType) => {
                const { element } = args;

                const toDelete = await getDescendantsOfElement(state, element);

                return {
                    state: {
                        ...state,
                        page: {
                            ...state.page,
                            blockVariables: removeElementVariables(
                                element,
                                state.page?.blockVariables ?? []
                            ),
                            dataBindings: removeDataBindings(
                                toDelete,
                                state.page?.dataBindings ?? []
                            )
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

const removeElementVariables = (block: PbEditorElement, blockVariables: PbBlockVariable[]) => {
    return blockVariables.filter(variable => variable.blockId !== block.id);
};

const removeDataBindings = (elements: ElementNode[], dataBindings: PbDataBinding[]) => {
    return dataBindings.filter(dataBinding => {
        return !elements.some(element => {
            return dataBinding.bindTo.startsWith(`element:${element.id}`);
        });
    });
};
