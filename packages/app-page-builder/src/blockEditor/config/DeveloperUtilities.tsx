import { useEffect } from "react";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";

export const DeveloperUtilities = () => {
    const { blockVariables } = useBlockVariables();

    useEffect(() => {
        // @ts-expect-error This is a developers-only utility.
        window["debug_printBlockVariables"] = () => {
            console.log(blockVariables);
        };
    }, [blockVariables]);

    return null;
};
