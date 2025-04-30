import type { TableType } from "~/sync/types.js";

export const getTableType = (tableName: string): TableType | null => {
    switch (tableName) {
        case process.env.DB_TABLE:
            return "regular";
        case process.env.DB_TABLE_ELASTICSEARCH:
            return "elasticsearch";
        case process.env.DB_TABLE_LOG:
            return "log";
        default:
            return null;
    }
};
