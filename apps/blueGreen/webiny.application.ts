import { createBlueGreenApp } from "@webiny/serverless-cms-aws";

export default createBlueGreenApp({
    pulumiResourceNamePrefix: "wby-",
    sources: {
        api: "api-bg.webiny.com",
        admin: "admin-bg.webiny.com",
        website: "website-bg.webiny.com",
        preview: "preview-bg.webiny.com"
    },
    deployments: [
        {
            name: "green",
            env: "green",
            variant: undefined
        },
        {
            name: "blue",
            env: "blue",
            variant: undefined
        }
    ]
});
