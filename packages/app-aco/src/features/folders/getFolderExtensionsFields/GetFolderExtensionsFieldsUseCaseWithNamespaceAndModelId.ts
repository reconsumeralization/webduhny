import type { IGetFolderExtensionsFieldsUseCase } from "./IGetFolderExtensionsFieldsUseCase";

export class GetFolderExtensionsFieldsUseCaseWithNamespaceAndModelId
    implements IGetFolderExtensionsFieldsUseCase
{
    private namespace: string;
    private modelId: string;
    private useCase: IGetFolderExtensionsFieldsUseCase;

    constructor(namespace: string, modelId: string, useCase: IGetFolderExtensionsFieldsUseCase) {
        this.namespace = namespace;
        this.modelId = modelId;
        this.useCase = useCase;
    }

    execute() {
        const { fields: extensionsFields } = this.useCase.execute();

        const fields = extensionsFields.filter(field => {
            if (field.tags!.includes("$namespace:global")) {
                return true; // Always include fields with this tag
            }

            const hasModelIdTag = field.tags!.some(tag => tag.startsWith("$modelId:"));

            return hasModelIdTag
                ? field.tags!.includes(`$modelId:${this.modelId}`)
                : field.tags!.includes(`$namespace:${this.namespace}`);
        });

        return {
            fields
        };
    }
}
