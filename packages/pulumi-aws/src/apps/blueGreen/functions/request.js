const cf = require("cloudfront");

const BLUE_GREEN_ROUTER_STORE_ID = "{BLUE_GREEN_ROUTER_STORE_ID}";
const BLUE_GREEN_ROUTER_STORE_KEY = "{BLUE_GREEN_ROUTER_STORE_KEY}";
const BLUE_GREEN_ROUTER_TYPE = "{BLUE_GREEN_ROUTER_TYPE}";

function requestWithError(request, err) {
    const error = err instanceof Error ? err : new Error(err);
    console.log(error);
    request.headers["x-debug-log"] = {
        value: error.message
    };
    return request;
}

function handleRequest(request, storedValue) {
    const routerType = BLUE_GREEN_ROUTER_TYPE;
    if (!routerType) {
        throw new Error("Missing router type.");
    }

    /**
     * What do we do in case there is no active variant system?
     */
    const cloudFrontDomainNameVariable = `${routerType}CloudfrontDomainName`;
    const domainName = storedValue.primary
        ? storedValue.primary[cloudFrontDomainNameVariable]
        : null;
    if (!domainName) {
        throw new Error(
            `Could not transfer the request to correct system - missing "${cloudFrontDomainNameVariable}".`
        );
    }

    request.origin = {
        custom: {
            domainName,
            port: 443,
            protocol: "https",
            path: "",
            sslProtocols: ["TLSv1.2"]
        }
    };

    console.log(
        JSON.stringify({
            outputRequest: request
        })
    );
    return request;
}
// eslint-disable-next-line
async function handler(event) {
    const context = event.context;
    const request = event.request;
    console.log(
        JSON.stringify({
            inputRequest: request
        })
    );
    try {
        if (context.eventType !== "viewer-request") {
            throw new Error("This function only supports viewer-request events.");
        }
        const store = cf.kvs(BLUE_GREEN_ROUTER_STORE_ID);
        const storedValue = await store.get(BLUE_GREEN_ROUTER_STORE_KEY);
        if (!storedValue) {
            throw new Error("Blue/Green system is not configured.");
        }
        const value = JSON.parse(storedValue);
        return handleRequest(request, value);
    } catch (ex) {
        return requestWithError(request, ex);
    }
}
