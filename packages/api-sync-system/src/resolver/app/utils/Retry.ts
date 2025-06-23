import { sleep } from "./sleep";

export interface IRetryable {
    retry<T>(fn: () => Promise<T>): Promise<T>;
}

export interface IRetryParams {
    maxRetries: number;
    retryDelay: number;
    onFail?: (error: Error) => Promise<void> | void;
}

export class Retry implements IRetryable {
    private readonly maxRetries: number;
    private readonly retryDelay: number;
    private retryCount: number = 0;
    private readonly onFail?: IRetryParams["onFail"];

    public constructor(params: IRetryParams) {
        this.maxRetries = params.maxRetries;
        this.retryDelay = params.retryDelay;
        this.onFail = params.onFail;
    }

    public async retry<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (ex) {
            if (this.retryCount >= this.maxRetries) {
                if (this.onFail) {
                    await this.onFail(ex as Error);
                }
                throw ex;
            }
        }
        this.retryCount++;
        await sleep(this.retryDelay);
        const result = await this.retry<T>(fn);
        this.retryCount = 0;
        return result;
    }
}

export const createRetry = (params: IRetryParams): IRetryable => {
    return new Retry(params);
};
