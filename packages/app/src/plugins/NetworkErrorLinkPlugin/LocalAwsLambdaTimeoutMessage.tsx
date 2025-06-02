import React from "react";
import styled from "@emotion/styled";

const Code = styled.code`
    font-family: monospace;
    font-size: 0.85rem;
    line-height: 1rem;
`;

export const LocalAwsLambdaTimeoutMessage = () => (
    <>
        Local AWS Lambda function execution timed out. Did you maybe stop the&nbsp;
        <Code>webiny watch</Code> command? If so, please restart the command or deploy your
        changes via the <Code>webiny deploy</Code> command, for example: <Code>yarn webiny deploy api --env dev</Code>.
        Learn more:&nbsp;
        <a
            href={"https://webiny.link/local-aws-lambda-development"}
            rel={"noreferrer noopener"}
            target={"_blank"}
        >
            https://webiny.link/local-aws-lambda-development
        </a>
        .
    </>
);
