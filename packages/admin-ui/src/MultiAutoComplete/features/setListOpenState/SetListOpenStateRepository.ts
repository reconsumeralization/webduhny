import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISetListOpenStateRepository } from "./ISetListOpenStateRepository";
import { IListOpenStateCache, ListOpenStateCacheAbstraction } from "../../domains";
import { container } from "../container";

export class SetListOpenStateRepository implements ISetListOpenStateRepository {
    private listOpenStateCache: IListOpenStateCache;

    constructor(listOpenStateCache: IListOpenStateCache) {
        this.listOpenStateCache = listOpenStateCache;
    }

    execute(isOpen: boolean) {
        this.listOpenStateCache.setState(isOpen);
    }
}

export const SetListOpenStateRepositoryAbstraction = new Abstraction<ISetListOpenStateRepository>(
    "SetListOpenStateRepository"
);

const SetListOpenStateRepositoryImpl = createImplementation({
    abstraction: SetListOpenStateRepositoryAbstraction,
    implementation: SetListOpenStateRepository,
    dependencies: [ListOpenStateCacheAbstraction]
});

container.register(SetListOpenStateRepositoryImpl);
