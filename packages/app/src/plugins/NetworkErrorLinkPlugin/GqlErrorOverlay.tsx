import React from "react";
import get from "lodash/get";
import { Typography } from "@webiny/ui/Typography";
import { i18n } from "../../i18n";
import { Pre } from "./StyledComponents";
import ErrorOverlay from "./ErrorOverlay";

const t = i18n.ns("app/graphql/error-overlay");

interface ErrorOverlayProps {
    query: string;
    networkError: {
        message: string;
        result?: {
            error?: {
                stack?: string;
            };
        };
    };
}

const GqlErrorOverlay = (props: ErrorOverlayProps) => {
    const { query, networkError } = props;
    const stackTrace = get(networkError, "result.error.stack");

    const title = networkError.message;

    const message = (
        <>
            <Typography
                use={"subtitle1"}
            >{t`Error occurred while executing operation:`}</Typography>
            <Pre>
                <code>{query}</code>
            </Pre>
        </>
    );

    let description: React.ReactNode = null;
    if (stackTrace) {
        description = (
            <>
                <Typography use={"subtitle1"}>{t`Complete stack trace:`}</Typography>
                <Pre>
                    <code>{stackTrace}</code>
                </Pre>
            </>
        );
    }

    return <ErrorOverlay title={title} message={message} description={description} />;
};

export default GqlErrorOverlay;
