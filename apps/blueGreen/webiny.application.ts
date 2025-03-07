import { createBlueGreenApp } from "@webiny/serverless-cms-aws";

const cert = "arn:aws:acm:us-east-1:250532744892:certificate/e7b88599-64ad-4df2-9284-c7ab5e20bb29";

export default createBlueGreenApp({
    pulumiResourceNamePrefix: "wby-",
    domains() {
        return {
            acmCertificateArn: cert,
            sslSupportMethod: "sni-only",
            domains: {
                api: ["api.bg.webiny.com", "api2.bg.webiny.com"],
                admin: ["admin.bg.webiny.com"],
                website: [
                    "website.bg.webiny.com",
                    "wb.bg.webiny.com",
                    "web.bg.webiny.com",
                    "www.bg.webiny.com"
                ],
                preview: ["preview.bg.webiny.com"]
            }
        };
    },
    deployments() {
        return [
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
        ];
    }
});
