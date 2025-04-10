import { PbContext } from "~/graphql/types";
import { ContextPlugin } from "@webiny/api";

export default () => {
    return new ContextPlugin<PbContext>(async ({ pageBuilder }) => {
        pageBuilder.onSettingsAfterUpdate.subscribe(async () => {
            // On every update of settings, we trigger a full website prerendering.
            // Might not be ideal for large websites, but it's a simple solution for now.
            await pageBuilder.prerendering.render({
                // This flag is for backwards compatibility with the original custom queue implementation
                // using the "cron job" type of Lambda worker, executed periodically.
                queue: true,
                paths: [{ path: "*" }]
            });
        });
    });
};
