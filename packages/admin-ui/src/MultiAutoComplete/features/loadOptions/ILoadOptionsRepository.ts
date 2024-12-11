import { CommandOption } from "~/Command";

export interface ILoadOptionsRepository {
    execute: (options: CommandOption[], selectedOptions: CommandOption[]) => Promise<void>;
}
