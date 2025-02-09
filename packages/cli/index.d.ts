import {CliContext} from "./types";

export * from "./regions"

export declare const getCli: () => CliContext;

export declare function initializeProject(): Promise<void>;
