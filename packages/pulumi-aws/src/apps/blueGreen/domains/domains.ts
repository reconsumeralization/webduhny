import type { IBlueGreenDomains } from "../types.js";

export const getDomains = (): IBlueGreenDomains => {
    return [
        {
            name: "green",
            domains: {
                api: "d23eod0opwn5wj.cloudfront.net",
                admin: "d1tfhjdlnuyb16.cloudfront.net",
                website: "d1252xj1fnqf4t.cloudfront.net",
                preview: "d30hx3bilq6uv7.cloudfront.net"
            }
        },
        {
            name: "blue",
            domains: {
                api: "dbef28872wnk6.cloudfront.net",
                admin: "d2nrb5rwmc7p0g.cloudfront.net",
                website: "d2f0oj3kdszw7y.cloudfront.net",
                preview: "d3pd007rivyf6j.cloudfront.net"
            }
        }
    ];
};
