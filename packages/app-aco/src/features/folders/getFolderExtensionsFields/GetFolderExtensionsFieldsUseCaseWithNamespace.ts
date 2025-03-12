import type { IGetFolderExtensionsFieldsUseCase } from "./IGetFolderExtensionsFieldsUseCase";

export class GetFolderExtensionsFieldsUseCaseWithNamespace
    implements IGetFolderExtensionsFieldsUseCase
{
    private namespace: string;
    private useCase: IGetFolderExtensionsFieldsUseCase;

    constructor(namespace: string, useCase: IGetFolderExtensionsFieldsUseCase) {
        this.namespace = namespace;
        this.useCase = useCase;
    }

    execute() {
        const { fields: extensionsFields } = this.useCase.execute();

        const fields = extensionsFields.filter(field => {
            if (field.tags!.includes("$namespace:global")) {
                return true; // Always include fields with this tag
            }

            return field.tags!.includes(`$namespace:${this.namespace}`);
        });

        return {
            fields
        };
    }
}
