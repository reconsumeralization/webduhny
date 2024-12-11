export interface IParams {
    key: string;
}

export const createPartitionKey = ({ key }: IParams) => {
    return `W#internal#${key}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSortKey = (_: IParams) => {
    return "A";
};

export const createGSI1PartitionKey = () => {
    return "W#internal";
};

export const createGSI1SortKey = ({ key }: IParams) => {
    return key;
};

export const createType = () => {
    return "internal";
};
