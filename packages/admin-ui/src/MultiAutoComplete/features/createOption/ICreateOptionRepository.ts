import { CommandOption } from "~/Command";

export interface ICreateOptionRepository {
    execute(option: CommandOption): Promise<void>;
}
