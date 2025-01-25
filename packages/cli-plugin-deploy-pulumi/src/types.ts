export {
    CliContext as Context,
    ProjectApplication,
    IProjectApplicationPackage
} from "@webiny/cli/types";

export interface IUserCommandParams {
    env: string;
    folder: string;
    variant?: string;
    debug?: boolean;
    cwd: string;
    telemetry?: boolean;
    logs?: boolean;
}
