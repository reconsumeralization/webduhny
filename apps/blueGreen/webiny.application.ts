import { createBlueGreenApp } from "@webiny/serverless-cms-aws";

const cert = process.env.WEBINY_BG_CERT_ARN as string;

export default createBlueGreenApp({
    pulumiResourceNamePrefix: "wby-",
    domains() {
        /**
         * For testing purposes only.
         */
        return {
            acmCertificateArn: cert,
            sslSupportMethod: "sni-only",
            domains: {
                api: ["api.bg.webiny.com"],
                admin: ["admin.bg.webiny.com"],
                website: ["website.bg.webiny.com"],
                preview: ["preview.bg.webiny.com"]
            }
        };
    },
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
