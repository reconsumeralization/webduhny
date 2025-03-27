import { ListFolders } from "./ListFolders";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";

describe("ListFolders", () => {
    const type = "abc";
    const gateway = {
        execute: jest.fn().mockResolvedValue([
            {
                id: "folder-1",
                title: "Folder 1",
                slug: "folder-1",
                type
            },
            {
                id: "folder-2",
                title: "Folder 2",
                slug: "folder-1",
                type
            },
            {
                id: "folder-3",
                title: "Folder 3",
                slug: "folder-3",
                type
            }
        ])
    };
    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        jest.clearAllMocks();
    });

    it("should be able to list folders", async () => {
        const listFolders = ListFolders.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await listFolders.useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const items = foldersCache.getItems();
        expect(items.length).toEqual(3);
    });

    it("should return empty array if no folders are found", async () => {
        const emptyGateway = {
            execute: jest.fn().mockResolvedValue([])
        };
        const listFolders = ListFolders.getInstance(type, emptyGateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await listFolders.useCase.execute();

        expect(emptyGateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();

        const items = foldersCache.getItems();
        expect(items.length).toEqual(0);
    });

    it("should handle gateway errors gracefully", async () => {
        const errorGateway = {
            execute: jest.fn().mockRejectedValue(new Error("Gateway error"))
        };
        const listFolders = ListFolders.getInstance(type, errorGateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await expect(listFolders.useCase.execute()).rejects.toThrow("Gateway error");

        expect(errorGateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();
    });

    it("should NOT cache folders after listing", async () => {
        const listFolders = ListFolders.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await listFolders.useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const items = foldersCache.getItems();
        expect(items.length).toEqual(3);

        // Execute again, it should execute the gateway again
        await listFolders.useCase.execute();
        expect(gateway.execute).toHaveBeenCalledTimes(2);
    });

    it("should clear cache when type changes", async () => {
        const listFolders = ListFolders.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await listFolders.useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const newType = "xyz";
        const newFoldersCache = folderCacheFactory.getCache(newType);
        const newListFolders = ListFolders.getInstance(newType, gateway);

        expect(newFoldersCache.hasItems()).toBeFalse();

        await newListFolders.useCase.execute();

        expect(gateway.execute).toHaveBeenCalledTimes(2);
        expect(newFoldersCache.hasItems()).toBeTrue();
    });
});
