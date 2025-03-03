import { GetFolderModel } from "./GetFolderModel";

describe("GetFolderModel", () => {
    const folderModel = {
        id: "folder-model",
        group: "custom-group",
        version: "0.0.0",
        fields: [
            {
                id: "field1",
                label: "Field 1",
                type: "string",
                fieldId: "field1"
            },
            {
                id: "field2",
                label: "Field 2",
                type: "string",
                fieldId: "field2"
            }
        ],
        lockedFields: [],
        icon: "icon",
        name: "Folder",
        modelId: "folder-model",
        singularApiName: "folderModel",
        pluralApiName: "foldersModel",
        titleFieldId: null,
        descriptionFieldId: null,
        imageFieldId: null
    };

    const gateway = {
        execute: jest.fn().mockResolvedValue(folderModel)
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should be able to get the folders model", async () => {
        const { useCase, repository } = GetFolderModel.getInstance(gateway);

        expect(repository.getModel()).toBeUndefined();

        await useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(repository.getModel()).toEqual(folderModel);
    });

    it("should handle gateway errors gracefully", async () => {
        const errorGateway = {
            execute: jest.fn().mockRejectedValue(new Error("Gateway error"))
        };
        const { useCase, repository } = GetFolderModel.getInstance(errorGateway);

        expect(repository.getModel()).toBeUndefined();

        await expect(useCase.execute()).rejects.toThrow("Gateway error");

        expect(errorGateway.execute).toHaveBeenCalledTimes(1);
        expect(repository.getModel()).toBeUndefined();
    });

    it("should cache folders model after listing", async () => {
        const { useCase, repository } = GetFolderModel.getInstance(gateway);

        expect(repository.getModel()).toBeUndefined();

        await useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(repository.getModel()).toEqual(folderModel);

        // Execute again, it should NOT execute the gateway again
        await useCase.execute();
        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(repository.getModel()).toEqual(folderModel);
    });
});
