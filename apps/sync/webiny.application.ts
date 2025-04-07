import { createSyncSystemApp } from "@webiny/serverless-cms-aws";

export default createSyncSystemApp({
    pulumiResourceNamePrefix: "wby-",
    deployments() {
        /**
         * For testing purposes only.
         */
        return [
            {
                name: "green",
                env: "dev",
                variant: "green"
            },
            {
                name: "blue",
                env: "dev",
                variant: "blue"
            }
        ];
    }
});
