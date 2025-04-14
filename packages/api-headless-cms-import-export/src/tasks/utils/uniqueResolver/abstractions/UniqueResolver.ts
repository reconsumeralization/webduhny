import type { GenericRecord } from "@webiny/api-core/types";

export interface IUniqueResolver<T extends GenericRecord> {
    resolve(assets: T[], field: keyof T): T[];
}
