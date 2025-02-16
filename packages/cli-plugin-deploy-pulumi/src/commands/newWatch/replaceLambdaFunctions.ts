import fs from "fs";
import pRetry from "p-retry";
import {
    GetFunctionConfigurationCommand,
    LambdaClient,
    UpdateFunctionCodeCommand,
    UpdateFunctionConfigurationCommand,
    UpdateFunctionConfigurationCommandInput
} from "@webiny/aws-sdk/client-lambda";
import { getStackExport, importStack } from "~/utils";
import { listLambdaFunctions } from "~/commands/newWatch/listLambdaFunctions";
import path from "path";
import { getProject } from "@webiny/cli/utils";

const WATCH_MODE_NOTE_IN_DESCRIPTION = " (watch mode 💡)";
const DEFAULT_INCREASE_TIMEOUT = 120;

export interface IReplaceLambdaFunctionsParamsLambdaFunction {
    name: string;
}

export interface IReplaceLambdaFunctionsParams {
    folder: string;
    env: string;
    variant?: string;

    iotEndpoint: string;
    iotEndpointTopic: string;
    sessionId: number;
    functionsList: ReturnType<typeof listLambdaFunctions>;
    increaseTimeout?: number;
}

export const replaceLambdaFunctions = ({
    folder,
    env,
    variant,
    iotEndpoint,
    iotEndpointTopic,
    sessionId,
    functionsList,
    increaseTimeout
}: IReplaceLambdaFunctionsParams) => {
    const stackExport = getStackExport({ folder, env, variant });
    if (!stackExport) {
        // If no stack export is found, return an empty array. This is a valid scenario.
        // For example, watching the Admin app locally, but not deploying it.
        return [];
    }

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

        // context.debug("%s function(s) replaced.", lambdaFunctions.length);
        // context.debug("Modifying Pulumi stack export.");

        const stackExportClone = structuredClone(stackExport);

        for (const resource of stackExportClone.deployment.resources) {
            if (resource.type !== "aws:lambda/function:Function") {
                continue;
            }

            const isModifiedFunction = functionsList.some(fn => fn.name === resource.outputs.name);
            if (!isModifiedFunction) {
                continue;
            }

            // @ts-expect-error todo
            resource.outputs.description = updatedFunctionConfig.Description;
            // @ts-expect-error todo
            resource.outputs.timeout = updatedFunctionConfig.Timeout;
            // @ts-expect-error todo
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
        fs.writeFileSync(temporaryStackExportPath, JSON.stringify(stackExportClone, null, 2));

        importStack({
            folder,
            env,
            variant,
            file: temporaryStackExportPath
        });

        // context.debug("Pulumi stack export modified.");
    });

    return Promise.all(replacementsPromises);
};
