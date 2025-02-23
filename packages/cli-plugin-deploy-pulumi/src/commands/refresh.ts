import { createPulumiCommand } from "~/utils";
import { pulumiRunCommand } from "./pulumiRun";

export const refreshCommand = createPulumiCommand({
    name: "refresh",
    createProjectApplicationWorkspace: false,
    command: async ({ inputs, context }) => {
        return pulumiRunCommand({ ...inputs, _: ["", "refresh", "--yes"] }, context);
    }
});
