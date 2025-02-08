import { useEffect } from "react";
import { useBlockVariables } from "~/blockVariables/useBlockVariables";
import { usePage } from "~/pageEditor";

export const DeveloperUtilities = () => {
    const { blockVariables } = useBlockVariables();
    const [page] = usePage();

    useEffect(() => {
        // @ts-expect-error This is a developers-only utility.
        window["debug_printBlockVariables"] = () => {
            console.log(blockVariables);
        };

        // @ts-expect-error This is a developers-only utility.
        window["debug_printPage"] = () => {
            console.log(page);
        };
    }, [blockVariables, page]);

    return null;
};
