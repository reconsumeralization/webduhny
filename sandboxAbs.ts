import { Abstraction as Base } from "~/Abstraction";

interface IOnPageBeforeCreate {
    execute(page: any): Promise<void>;
}
export const OnPageBeforeCreate = new Base<IOnPageBeforeCreate>("OnPageBeforeCreate");

export namespace OnPageBeforeCreate {
    export interface Interface extends IOnPageBeforeCreate {}
}