import { IUpdateFolderUseCase, UpdateFolderParams } from "./IUpdateFolderUseCase";

export class UpdateFolderUseCaseWithoutInheritedPermissions implements IUpdateFolderUseCase {
    private useCase: IUpdateFolderUseCase;

    constructor(useCase: IUpdateFolderUseCase) {
        this.useCase = useCase;
    }

    async execute(params: UpdateFolderParams) {
        // We must omit all inherited permissions.
        const permissions = params.permissions.filter(p => !p.inheritedFrom);

        await this.useCase.execute({
            ...params,
            permissions
        });
    }
}
