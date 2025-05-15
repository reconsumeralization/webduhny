import { ITable } from "~/sync/types";

export const createRegularMockTable = (params?: ITable): ITable => {
    return {
        name: process.env.DB_TABLE as string,
        type: "regular",
        arn: "arnRegular",
        ...params
    };
};

export const createElasticsearchMockTable = (params?: ITable): ITable => {
    return {
        name: process.env.DB_TABLE_ELASTICSEARCH as string,
        type: "elasticsearch",
        arn: "arnElasticsearch",
        ...params
    };
};

export const createLogMockTable = (params?: ITable): ITable => {
    return {
        name: process.env.DB_TABLE_LOG as string,
        type: "log",
        arn: "arnLog",
        ...params
    };
};
