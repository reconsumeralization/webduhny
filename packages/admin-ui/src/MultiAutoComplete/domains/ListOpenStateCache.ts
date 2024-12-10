import { makeAutoObservable } from "mobx";
import { Abstraction, createImplementation } from "@webiny/di-container";
import { container } from "../features/container";

export interface IListOpenStateCache {
    setState(state: boolean): void;
    getState(): boolean;
}

class ListOpenStateCache implements IListOpenStateCache {
    private state = false;

    constructor() {
        makeAutoObservable(this);
    }

    setState(state: boolean) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}

export const ListOpenStateCacheAbstraction = new Abstraction<IListOpenStateCache>(
    "ListOpenStateCache"
);

const ListOpenStateCacheImpl = createImplementation({
    abstraction: ListOpenStateCacheAbstraction,
    implementation: ListOpenStateCache,
    dependencies: []
});

container.register(ListOpenStateCacheImpl).inSingletonScope();
