import { initializeProject } from "@webiny/cli";
import projectApplication from "../webiny.application";

export = async () => {
    await initializeProject();
    const pulumi = await projectApplication.getPulumi();

    return pulumi.run({
        env: "{DEPLOY_ENV}",
        variant: "{DEPLOY_VARIANT}"
    });
};
