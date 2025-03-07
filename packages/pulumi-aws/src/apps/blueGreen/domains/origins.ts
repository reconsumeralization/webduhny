const x = {
    origins: [
        {
            domainName: "dbef28872wnk6.cloudfront.net",
            originId: "apiGreenBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d23eod0opwn5wj.cloudfront.net",
            originId: "apiBlueBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d2nrb5rwmc7p0g.cloudfront.net",
            originId: "adminGreenBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d1tfhjdlnuyb16.cloudfront.net",
            originId: "adminBlueBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d2f0oj3kdszw7y.cloudfront.net",
            originId: "websiteGreenBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d1252xj1fnqf4t.cloudfront.net",
            originId: "websiteBlueBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d3pd007rivyf6j.cloudfront.net",
            originId: "previewGreenBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        },
        {
            domainName: "d30hx3bilq6uv7.cloudfront.net",
            originId: "previewBlueBlueGreenCloudFront",
            customOriginConfig: {
                originProtocolPolicy: "https-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"]
            }
        }
    ],
    orderedCacheBehaviors: [
        {
            pathPattern: "*",
            targetOriginId: "apiGreenBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "apiBlueBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "adminGreenBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "adminBlueBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "websiteGreenBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "websiteBlueBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "previewGreenBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        },
        {
            pathPattern: "*",
            targetOriginId: "previewBlueBlueGreenCloudFront",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
            cachedMethods: ["GET", "HEAD"],
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
            originRequestPolicyId: "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        }
    ]
};

const y = [
    {
        type: "api",
        name: "green",
        sources: ["api.bg.webiny.com", "api2.bg.webiny.com"],
        target: "dbef28872wnk6.cloudfront.net"
    },
    {
        type: "api",
        name: "blue",
        sources: ["api.bg.webiny.com", "api2.bg.webiny.com"],
        target: "d23eod0opwn5wj.cloudfront.net"
    },
    {
        type: "admin",
        name: "green",
        sources: ["admin.bg.webiny.com"],
        target: "d2nrb5rwmc7p0g.cloudfront.net"
    },
    {
        type: "admin",
        name: "blue",
        sources: ["admin.bg.webiny.com"],
        target: "d1tfhjdlnuyb16.cloudfront.net"
    },
    {
        type: "website",
        name: "green",
        sources: [
            "website.bg.webiny.com",
            "wb.bg.webiny.com",
            "web.bg.webiny.com",
            "www.bg.webiny.com"
        ],
        target: "d2f0oj3kdszw7y.cloudfront.net"
    },
    {
        type: "website",
        name: "blue",
        sources: [
            "website.bg.webiny.com",
            "wb.bg.webiny.com",
            "web.bg.webiny.com",
            "www.bg.webiny.com"
        ],
        target: "d1252xj1fnqf4t.cloudfront.net"
    },
    {
        type: "preview",
        name: "green",
        sources: ["preview.bg.webiny.com"],
        target: "d3pd007rivyf6j.cloudfront.net"
    },
    {
        type: "preview",
        name: "blue",
        sources: ["preview.bg.webiny.com"],
        target: "d30hx3bilq6uv7.cloudfront.net"
    }
];
