import React from "react";
import { Theme } from "./configComponents/Theme";
import { PublicAsset } from "./configComponents/PublicAsset";

const Webiny = () => {
    return (
        <>
            <Theme name={"default"} path={"/themes/default"} />
            <PublicAsset path={"/a/b/c.txt"} name={"c.txt"} />
            <PublicAsset path={"/a/b/d.txt"} name={"d.txt"} />
        </>
    );
};

export default Webiny;
