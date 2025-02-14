import type { IUserCommandInput } from "~/types";

export interface IExecuteSetPrimaryVariantCommandParams extends IUserCommandInput {
    confirm: boolean;
    primary: string | undefined;
    secondary: string | undefined;
}
