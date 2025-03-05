import cf from "cloudfront";

const BLUE_GREEN_ROUTER_STORE_ID = "{BLUE_GREEN_ROUTER_STORE_ID}";
const BLUE_GREEN_ROUTER_STORE_KEY = "{BLUE_GREEN_ROUTER_STORE_KEY}";
const BLUE_GREEN_ROUTER_TYPE_HEADER = "{BLUE_GREEN_ROUTER_TYPE_HEADER}";

const store = cf.kvs(BLUE_GREEN_ROUTER_STORE_ID);

function requestWithError(request, error) {
    console.error(error.message);
    request.headers["x-debug-log"] = {
        value: error.message
    };

    return request;
}

function getRouterType(headers) {
    const values = headers[BLUE_GREEN_ROUTER_TYPE_HEADER];
    if (!values) {
        return {
            error: new Error(`Missing the "${BLUE_GREEN_ROUTER_TYPE_HEADER}" header.`)
        };
    }
    let value;
    if (Array.isArray(values)) {
        value = values[0] ? values[0].value : null;
    } else {
        value = values.value;
    }
    if (value) {
        return {
            value
        };
    }
    return {
        error: new Error(`Missing the "${BLUE_GREEN_ROUTER_TYPE_HEADER}" header value.`)
    };
}

function handleRequest(request, storedValue) {
    const routerTypeResult = getRouterType(request.headers || {});
    if (routerTypeResult.error) {
        return requestWithError(request, routerTypeResult.error);
    }
    const routerType = routerTypeResult.value;

    /**
     * What do we do in case there is no active variant system?
     */
    const cloudFrontDomainNameVariable = `${routerType}CloudfrontDomainName`;
    const domainName = storedValue.primary
        ? storedValue.primary[cloudFrontDomainNameVariable]
        : null;
    if (!domainName) {
        return requestWithError(
            request,
            new Error(
                `Could not transfer the request to correct system - missing "${cloudFrontDomainNameVariable}".`
            )
        );
    }

    request.headers.host = {
        value: domainName
    };

    return request;
}

const x = {
    event: {
        version: "1.0",
        context: {
            distributionDomainName: "d123.cloudfront.net",
            distributionId: "E123",
            eventType: "viewer-request",
            requestId: "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
        },
        viewer: { ip: "1.2.3.4" },
        request: {
            method: "GET",
            uri: "/index.html",
            querystring: {},
            headers: { "x-webiny-blue-green-router-type": { value: "admin" } },
            cookies: {}
        }
    }
};

async function handler(event) {
    console.log({
        event
    });
    const context = event.context;
    const request = event.request;
    if (context.eventType !== "viewer-request") {
        return requestWithError(
            request,
            new Error("This function only supports viewer-request events.")
        );
    }

    let storedValue;

    try {
        storedValue = await store.get(BLUE_GREEN_ROUTER_STORE_KEY);
    } catch (ex) {
        return requestWithError(request, ex);
    }
    if (!storedValue) {
        return requestWithError(request, new Error("Blue/Green system is not configured."));
    }
    const value = JSON.parse(storedValue);
    return handleRequest(request, value);
}
