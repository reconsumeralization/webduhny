import { ListFoldersByParentIds } from "./ListFoldersByParentIds";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";
import { loadedFolderCacheFactory } from "../cache/LoadedFoldersCacheFactory";
import { ROOT_FOLDER } from "~/constants";

describe("ListFoldersByParentIds", () => {
    const type = "abc";

    const foldersCache = folderCacheFactory.getCache(type);
    const loadedFoldersCache = loadedFolderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        loadedFoldersCache.clear();
        jest.resetAllMocks();
    });

    it("should list folders from `ROOT` level if parentIds is `undefined`", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue([
                {
                    id: "folder-1",
                    title: "Folder 1",
                    slug: "folder-1",
                    parentId: null,
                    type
                },
                {
                    id: "folder-2",
                    title: "Folder 2",
                    slug: "folder-2",
                    parentId: null,
                    type
                },
                {
                    id: "folder-3",
                    title: "Folder 3",
                    slug: "folder-3",
                    parentId: null,
                    type
                }
            ])
        };

        const listByParentIdFolders = ListFoldersByParentIds.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();
        await listByParentIdFolders.useCase.execute({ parentIds: undefined });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(gateway.execute).toHaveBeenCalledWith({ parentIds: [ROOT_FOLDER], type });

        expect(foldersCache.hasItems()).toBeTrue();
        expect(foldersCache.count()).toEqual(3);

        // This call should be idempotent: the number of elements in cache should not change
        await listByParentIdFolders.useCase.execute({ parentIds: undefined });
        expect(foldersCache.count()).toEqual(3);
    });

    it("should list folders from the provided `parentIds`", async () => {
        const gateway = {
            execute: jest
                .fn()
                .mockImplementationOnce(() =>
                    Promise.resolve([
                        {
                            id: "folder-1",
                            title: "Folder 1",
                            slug: "folder-1",
                            parentId: "folder-0",
                            type
                        },
                        {
                            id: "folder-2",
                            title: "Folder 2",
                            slug: "folder-1",
                            parentId: "folder-0",
                            type
                        },
                        {
                            id: "folder-3",
                            title: "Folder 3",
                            slug: "folder-3",
                            parentId: "folder-0",
                            type
                        }
                    ])
                )
                .mockImplementationOnce(() =>
                    Promise.resolve([
                        {
                            id: "folder-4",
                            title: "Folder 4",
                            slug: "folder-4",
                            parentId: "folder-1",
                            type
                        },
                        {
                            id: "folder-5",
                            title: "Folder 5",
                            slug: "folder-5",
                            parentId: "folder-1",
                            type
                        },
                        {
                            id: "folder-6",
                            title: "Folder 6",
                            slug: "folder-6",
                            parentId: "folder-1",
                            type
                        }
                    ])
                )
        };

        const listByParentIdFolders = ListFoldersByParentIds.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();
        await listByParentIdFolders.useCase.execute({ parentIds: ["folder-0"] });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(gateway.execute).toHaveBeenCalledWith({ parentIds: ["folder-0"], type });

        expect(foldersCache.hasItems()).toBeTrue();
        expect(foldersCache.count()).toEqual(3);

        // The number of folders in cache should increase, since we are changing the parentIds
        await listByParentIdFolders.useCase.execute({ parentIds: ["folder-1"] });
        expect(foldersCache.count()).toEqual(6);
    });

    it("should list folders from missing `parentIds` stored in cache", async () => {
        const gateway = {
            execute: jest
                .fn()
                .mockImplementationOnce(() =>
                    Promise.resolve([
                        {
                            id: "folder-1",
                            title: "Folder 1",
                            slug: "folder-1",
                            parentId: "folder-0",
                            type
                        },
                        {
                            id: "folder-2",
                            title: "Folder 2",
                            slug: "folder-2",
                            parentId: "folder-1",
                            type
                        }
                    ])
                )
                .mockImplementationOnce(() =>
                    Promise.resolve([
                        {
                            id: "folder-3",
                            title: "Folder 3",
                            slug: "folder-3",
                            parentId: "folder-2",
                            type
                        }
                    ])
                )
        };

        const listByParentIdFolders = ListFoldersByParentIds.getInstance(type, gateway);

        // Execute the useCase 3 times and check the gateway is invoked only when needed
        await listByParentIdFolders.useCase.execute({ parentIds: ["folder-0", "folder-1"] });
        await listByParentIdFolders.useCase.execute({
            parentIds: ["folder-0", "folder-1", "folder-2"]
        });
        await listByParentIdFolders.useCase.execute({
            parentIds: ["folder-0", "folder-1", "folder-2"]
        });

        expect(gateway.execute).toHaveBeenNthCalledWith(1, {
            parentIds: ["folder-0", "folder-1"],
            type
        });
        expect(gateway.execute).toHaveBeenNthCalledWith(2, { parentIds: ["folder-2"], type });
        expect(gateway.execute).not.toHaveBeenCalledTimes(3);
    });

    it("should return empty array if no folders are found", async () => {
        const emptyGateway = {
            execute: jest.fn().mockResolvedValue([])
        };
        const listByParentIdFolders = ListFoldersByParentIds.getInstance(type, emptyGateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await listByParentIdFolders.useCase.execute({});

        expect(emptyGateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();

        const items = foldersCache.getItems();
        expect(items.length).toEqual(0);
    });

    it("should handle gateway errors gracefully", async () => {
        const errorGateway = {
            execute: jest.fn().mockRejectedValue(new Error("Gateway error"))
        };
        const listByParentIdFolders = ListFoldersByParentIds.getInstance(type, errorGateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await expect(listByParentIdFolders.useCase.execute({})).rejects.toThrow("Gateway error");

        expect(errorGateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();
    });

    it("should clear cache when type changes", async () => {
        const gatewayAbc = {
            execute: jest.fn().mockResolvedValue([
                {
                    id: "folder-1",
                    title: "Folder 1",
                    slug: "folder-1",
                    parentId: null,
                    type
                },
                {
                    id: "folder-2",
                    title: "Folder 2",
                    slug: "folder-1",
                    parentId: null,
                    type
                },
                {
                    id: "folder-3",
                    title: "Folder 3",
                    slug: "folder-3",
                    parentId: null,
                    type
                }
            ])
        };

        const newType = "xyz";
        const gatewayXyz = {
            execute: jest.fn().mockResolvedValue([
                {
                    id: "folder-1",
                    title: "Folder 1",
                    slug: "folder-1",
                    parentId: null,
                    type: newType
                },
                {
                    id: "folder-2",
                    title: "Folder 2",
                    slug: "folder-1",
                    parentId: null,
                    type: newType
                },
                {
                    id: "folder-3",
                    title: "Folder 3",
                    slug: "folder-3",
                    parentId: null,
                    type: newType
                }
            ])
        };

        const listFoldersByParentId = ListFoldersByParentIds.getInstance(type, gatewayAbc);

        expect(foldersCache.hasItems()).toBeFalse();

        await listFoldersByParentId.useCase.execute({});

        expect(gatewayAbc.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const newFoldersCache = folderCacheFactory.getCache(newType);
        const newListFoldersByParentId = ListFoldersByParentIds.getInstance(newType, gatewayXyz);

        expect(newFoldersCache.hasItems()).toBeFalse();

        await newListFoldersByParentId.useCase.execute({});

        expect(gatewayXyz.execute).toHaveBeenCalledTimes(1);
        expect(newFoldersCache.hasItems()).toBeTrue();
    });
});
