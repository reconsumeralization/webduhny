import {Project, ProjectApplication} from "../types";

export declare function getProject(): Project;

export interface IGetProjectApplicationParams {
    cwd: string;
}

export declare function getProjectApplication(params: IGetProjectApplicationParams): ProjectApplication;
