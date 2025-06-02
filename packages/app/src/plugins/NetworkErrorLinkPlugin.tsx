import React from "react";
import { ApolloLinkPlugin } from "./ApolloLinkPlugin";
import { onError } from "apollo-link-error";
import { type ServerError } from "apollo-link-http-common";
import { print } from "graphql/language";
import createGqlErrorOverlay from "./NetworkErrorLinkPlugin/createGqlErrorOverlay";
import createErrorOverlay from "./NetworkErrorLinkPlugin/createErrorOverlay";
import { LocalAwsLambdaTimeoutMessage } from "./NetworkErrorLinkPlugin/LocalAwsLambdaTimeoutMessage";
import { boolean } from "boolean";
import { config as appConfig } from "~/config";

const isLocalAwsLambdaFnInvocationTimeoutError = (error: any): error is ServerError => {
    return error.result && error.result.code === "LOCAL_AWS_LAMBDA_TIMEOUT";
};

/**
 * This plugin creates an ApolloLink that checks for `NetworkError` and shows an ErrorOverlay in the browser.
 */
export class NetworkErrorLinkPlugin extends ApolloLinkPlugin {
    public override createLink() {
        return onError(({ networkError, operation }) => {
            const debug = appConfig.getKey("DEBUG", boolean(process.env.REACT_APP_DEBUG));

            if (networkError && debug) {
                if (isLocalAwsLambdaFnInvocationTimeoutError(networkError)) {
                    createErrorOverlay({ message: <LocalAwsLambdaTimeoutMessage />, closeable: false });
                    return;
                }

                createGqlErrorOverlay({ query: print(operation.query), networkError });
            }

            // TODO: also print graphQLErrors
        });
    }
}
