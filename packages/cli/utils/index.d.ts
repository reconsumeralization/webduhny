import { Project, ProjectApplication } from "../types";

export interface IGetProjectParams {
    cwd: string;
}

export declare function getProject(params?: IGetProjectParams): Project;

export interface IGetProjectApplicationParams {
    cwd: string;
}

export declare function getProjectApplication(
    params: IGetProjectApplicationParams
): ProjectApplication;

export declare function sendEvent(event: string, properties?: Record<string, any>): Promise<void>;

export declare function sleepSync(ms?: number): void;

export declare const log: {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    success: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    warning: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
