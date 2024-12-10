import { makeAutoObservable } from "mobx";
import { Abstraction, createImplementation } from "@webiny/di-container";
import { container } from "../features/container";

export interface ISearchQueryCache {
    setState(state: string): void;
    getState(): string;
}

class SearchQueryCache implements ISearchQueryCache {
    private state = "";

    constructor() {
        makeAutoObservable(this);
    }

    setState(state: string) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}

export const SearchQueryCacheAbstraction = new Abstraction<ISearchQueryCache>("SearchQueryCache");

const SearchQueryCacheCacheImpl = createImplementation({
    abstraction: SearchQueryCacheAbstraction,
    implementation: SearchQueryCache,
    dependencies: []
});

container.register(SearchQueryCacheCacheImpl).inSingletonScope();
