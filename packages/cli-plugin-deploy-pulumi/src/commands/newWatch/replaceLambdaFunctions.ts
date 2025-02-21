import fs from "fs";
import pRetry from "p-retry";
import {
    GetFunctionConfigurationCommand,
    LambdaClient,
    UpdateFunctionCodeCommand,
    UpdateFunctionConfigurationCommand,
    UpdateFunctionConfigurationCommandInput
} from "@webiny/aws-sdk/client-lambda";
import path from "path";
import { getStackExport, importStack } from "~/utils";
import { type listLambdaFunctions } from "./listLambdaFunctions";
import { getProject } from "@webiny/cli/utils";
import { Context } from "~/types";

const WATCH_MODE_NOTE_IN_DESCRIPTION = " (💡 local development mode, redeploy to remove)";
const DEFAULT_INCREASE_TIMEOUT = 120;

export interface IReplaceLambdaFunctionsParams {
    folder: string;
    env: string;
    variant?: string;
    iotEndpoint: string;
    iotEndpointTopic: string;
    sessionId: number;
    functionsList: ReturnType<typeof listLambdaFunctions>;
    increaseTimeout?: number;
    context: Context;
}

export const replaceLambdaFunctions = async ({
    folder,
    env,
    variant,
    iotEndpoint,
    iotEndpointTopic,
    sessionId,
    functionsList,
    increaseTimeout,
    context
}: IReplaceLambdaFunctionsParams) => {
    const stackExport = getStackExport({ folder, env, variant });
    if (!stackExport) {
        // If no stack export is found, return an empty array. This is a valid scenario.
        // For example, watching the Admin app locally, but not deploying it.
        context.debug("No AWS Lambda functions to replace.", functionsList.length);
        return [];
    }

    context.debug("replacing %s AWS Lambda function(s).", functionsList.length);
    const lambdaClient = new LambdaClient();

    const replacementsPromises = functionsList.map(async fn => {
        const getFnConfigCmd = new GetFunctionConfigurationCommand({ FunctionName: fn.name });
        const lambdaFnConfiguration = await lambdaClient.send(getFnConfigCmd);

        const updateFnCodeCmd = new UpdateFunctionCodeCommand({
            FunctionName: fn.name,
            ZipFile: fs.readFileSync(__dirname + "/handler/handler.zip")
        });

        await lambdaClient.send(updateFnCodeCmd);

        let Description = lambdaFnConfiguration.Description || "";
        if (!Description.endsWith(WATCH_MODE_NOTE_IN_DESCRIPTION)) {
            Description += WATCH_MODE_NOTE_IN_DESCRIPTION;
        }

        const Timeout = increaseTimeout || DEFAULT_INCREASE_TIMEOUT;

        const updatedFunctionConfig: UpdateFunctionConfigurationCommandInput = {
            FunctionName: fn.name,
            Timeout,
            Description,
            Environment: {
                Variables: {
                    ...lambdaFnConfiguration.Environment?.Variables,
                    WEBINY_WATCH: JSON.stringify({
                        enabled: true,
                        sessionId,
                        iotEndpoint,
                        iotEndpointTopic,
                        functionName: fn.name
                    })
                }
            }
        };

        await pRetry(() =>
            lambdaClient.send(new UpdateFunctionConfigurationCommand(updatedFunctionConfig))
        );

        for (const resource of stackExport.deployment.resources) {
            if (resource.type !== "aws:lambda/function:Function") {
                continue;
            }

            const isModifiedFunction = functionsList.some(fn => fn.name === resource.outputs.name);
            if (!isModifiedFunction) {
                continue;
            }

            context.debug(
                "Modifying Pulumi state for %s AWS Lambda function.",
                resource.outputs.name
            );

            resource.outputs.description = updatedFunctionConfig.Description;
            resource.outputs.timeout = updatedFunctionConfig.Timeout;
            resource.outputs.environment = updatedFunctionConfig.Environment;
        }

        const project = getProject();

        const ts = new Date().getTime();
        const temporaryStackExportPath = path.join(
            project.root,
            ".webiny",
            "watch-command-temporary-stack-exports",
            `${ts}.json`
        );

        fs.mkdirSync(path.dirname(temporaryStackExportPath), { recursive: true });
        fs.writeFileSync(temporaryStackExportPath, JSON.stringify(stackExport, null, 2));

        importStack({
            folder,
            env,
            variant,
            file: temporaryStackExportPath
        });

        context.debug("Pulumi state updated for %s AWS Lambda function.", fn.name);
    });

    return Promise.all(replacementsPromises).then(res => {
        context.debug("%s AWS Lambda function(s) replaced.", functionsList.length);
        return res;
    });
};
