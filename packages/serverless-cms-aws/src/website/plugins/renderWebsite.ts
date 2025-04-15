import { EventBridgeClient, PutEventsCommand } from "@webiny/aws-sdk/client-eventbridge";
import { CliContext } from "@webiny/cli/types";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";

export interface IRenderWebsiteParams {
    env: string;
    inputs: IRenderWebsiteParamsInputs;
}

export interface IRenderWebsiteParamsInputs {
    preview?: boolean;
    build?: boolean;
}

interface RenderWebsiteParams {
    prerender: (params: IRenderWebsiteParams) => boolean;
}

/**
 * On every deployment of the Website project application, this plugin ensures all pages created
 * with the Webiny Page Builder application are re-rendered.
 */
export const renderWebsite = (renderWebsiteParams: RenderWebsiteParams) => {
    return {
        type: "hook-after-deploy",
        name: "hook-after-deploy-website-render",
        async hook(params: IRenderWebsiteParams, context: CliContext) {
            if (params.inputs.build === false) {
                context.info(`"--no-build" argument detected - skipping Website re-rendering.`);
                return;
            }

            // No need to re-render the website if we're doing a preview.
            if (params.inputs.preview) {
                return;
            }

            if (!renderWebsiteParams.prerender(params)) {
                context.info("Skipping complete website rendering.");
                return;
            }

            const coreOutput = getStackOutput({ folder: "apps/core", env: params.env });

            context.info("Issuing a complete website rendering job...");

            try {
                const client = new EventBridgeClient({ region: coreOutput["region"] });

                const result = await client.send(
                    new PutEventsCommand({
                        Entries: [
                            {
                                Source: "webiny-cli",
                                EventBusName: coreOutput["eventBusArn"],
                                DetailType: "RenderPages",
                                Detail: JSON.stringify({ path: "*", tenant: "*" })
                            }
                        ]
                    })
                );

                const entry = result.Entries?.[0];
                if (entry?.ErrorMessage) {
                    throw new Error(entry.ErrorMessage);
                }

                context.success("Website rendering job successfully issued.");
                context.info(
                    "Please note that it can take a couple of minutes for the website to be fully updated."
                );
            } catch (e) {
                context.error(`An error occurred while issuing a website rendering job!`);
                console.log(e);
            }
        }
    };
};
