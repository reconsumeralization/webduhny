import { CommandOption } from "~/Command/CommandOption";

export interface ISetSelectedOptionRepository {
    execute: (options: CommandOption) => Promise<void>;
}
