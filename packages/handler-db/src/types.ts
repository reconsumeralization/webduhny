import { Db } from "@webiny/db";
import { Context } from "@webiny/api-core/types";

export interface DbContext extends Context {
    db: Db<unknown>;
}
