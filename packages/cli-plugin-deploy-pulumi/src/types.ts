export {
    CliContext as Context,
    ProjectApplication,
    IProjectApplicationPackage
} from "@webiny/cli/types";

import type { Pulumi } from "@webiny/pulumi-sdk";

export type IPulumi = Pulumi;

export interface IUserCommandInput {
    env: string;
    folder: string;
    variant?: string;
    debug?: boolean;
    cwd?: string;
    telemetry?: boolean;
    logs?: boolean;
    json?: boolean;
    build?: boolean;
    deploy?: boolean;
    package?: string;
    preview?: boolean;
    inspect?: boolean;
    depth?: number;
    allowProduction?: boolean;
    remoteRuntimeLogs?: string;
    increaseTimeout?: number;
    deploymentLogs?: boolean;
    _: (string | boolean | number)[];
}
