import React, { createContext } from "react";
import type { PbBlockVariable, PbEditorElement } from "~/types";
import { useDynamicDocument } from "~/dataInjection";

interface Updater<T> {
    (items: T[]): T[];
}

export interface BlockVariablesContext {
    blockVariables: PbBlockVariable[];
    updateBlockVariables: (cb: Updater<PbBlockVariable>) => void;
    removeBlockVariables: (element: PbEditorElement) => void;
    moveBlockVariable: (variable: PbBlockVariable, moveToIndex: number) => void;
}

export interface BlockVariablesProviderProps {
    blockVariables: PbBlockVariable[];
    onBlockVariables: (blockVariables: PbBlockVariable[]) => void;
    children: React.ReactNode;
}

export interface Filter<T> {
    (item: T): boolean;
}

export const BlockVariablesContext = createContext<BlockVariablesContext | undefined>(undefined);

export const BlockVariablesProvider = ({
    blockVariables,
    onBlockVariables,
    children
}: BlockVariablesProviderProps) => {
    const { updateDataBindings } = useDynamicDocument();

    const updateBlockVariables = (cb: Updater<PbBlockVariable>) => {
        onBlockVariables(cb(blockVariables));
    };

    const removeBlockVariables = (element: PbEditorElement) => {
        const toDelete: PbBlockVariable[] = [];

        updateBlockVariables(variables => {
            return variables.filter(v => {
                const match = v.elementId === element.id;

                if (match) {
                    toDelete.push(v);
                }

                return !match;
            });
        });

        updateDataBindings(bindings => {
            return bindings.filter(b => {
                return !toDelete.find(td => {
                    return (
                        b.dataSource === "static" &&
                        b.bindTo === `element:${td.elementId}.${td.inputName}`
                    );
                });
            });
        });
    };

    const moveBlockVariable = (variable: PbBlockVariable, moveToIndex: number) => {
        updateBlockVariables(variables => {
            const localVars = variables.filter(bv => bv.blockId === variable.blockId);
            const realSourceIndex = variables.findIndex(
                v =>
                    v.blockId === variable.blockId &&
                    v.elementId === variable.elementId &&
                    v.inputName === variable.inputName
            );

            // First we want to remove the item being moved from the array.
            const withoutSource = [
                ...variables.slice(0, realSourceIndex),
                ...variables.slice(realSourceIndex + 1)
            ];

            const realTargetIndex = withoutSource.findIndex(
                v =>
                    v.blockId === localVars[moveToIndex].blockId &&
                    v.elementId === localVars[moveToIndex].elementId &&
                    v.inputName === localVars[moveToIndex].inputName
            );

            // Then we insert the item into the new position.
            return [
                ...withoutSource.slice(0, realTargetIndex),
                variable,
                ...withoutSource.slice(realTargetIndex)
            ];
        });
    };

    return (
        <BlockVariablesContext.Provider
            value={{
                blockVariables,
                updateBlockVariables,
                moveBlockVariable,
                removeBlockVariables
            }}
        >
            {children}
        </BlockVariablesContext.Provider>
    );
};
