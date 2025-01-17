import { useContext } from "react";
import { BlockVariablesContext } from "~/blockVariables/BlockVariablesProvider";

export const useBlockVariables = () => {
    const context = useContext(BlockVariablesContext);

    if (!context) {
        throw Error(`Missing BlockVariablesProvider in the component hierarchy!`);
    }

    return context;
};
