export type Pojo = Record<string, any>;

export interface GqlResponseError<T = Pojo> {
    code: string;
    data: T;
    message: string;
}