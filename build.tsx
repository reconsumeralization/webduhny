import { WC } from "@webiny/wc";

(async () => {
    const wc = new WC();

    const result = await wc.build();
    console.log("Build completed successfully.");
    console.log(JSON.stringify(result.manifest, null, 2));
})();
