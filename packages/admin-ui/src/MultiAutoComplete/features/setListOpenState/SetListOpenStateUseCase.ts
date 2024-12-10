import { Abstraction, createImplementation } from "@webiny/di-container";
import { ISetListOpenStateRepository } from "./ISetListOpenStateRepository";
import { ISetListOpenStateUseCase } from "./ISetListOpenStateUseCase";
import { SetListOpenStateRepositoryAbstraction } from "./SetListOpenStateRepository";
import { container } from "../container";

export class SetListOpenStateUseCase implements ISetListOpenStateUseCase {
    private repository: ISetListOpenStateRepository;

    constructor(repository: ISetListOpenStateRepository) {
        this.repository = repository;
    }

    execute(isOpen: boolean) {
        this.repository.execute(isOpen);
    }
}

export const SetListOpenStateUseCaseAbstraction = new Abstraction<ISetListOpenStateUseCase>(
    "SetListOpenStateUseCase"
);

const SetListOpenStateUseCaseAbstractionImpl = createImplementation({
    abstraction: SetListOpenStateUseCaseAbstraction,
    implementation: SetListOpenStateUseCase,
    dependencies: [SetListOpenStateRepositoryAbstraction]
});

container.register(SetListOpenStateUseCaseAbstractionImpl);
