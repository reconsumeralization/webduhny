import { CommandOption } from "~/Command";

export interface ILoadOptionsRepository {
    execute: (options: CommandOption[]) => Promise<void>;
}
