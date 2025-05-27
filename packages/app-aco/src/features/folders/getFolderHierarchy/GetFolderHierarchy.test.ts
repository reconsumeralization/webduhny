import { GetFolderHierarchy } from "./GetFolderHierarchy";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";
import { loadedFolderCacheFactory } from "../cache/LoadedFoldersCacheFactory";

describe("GetFolderHierarchy", () => {
    const type = "abc";

    const foldersCache = folderCacheFactory.getCache(type);
    const loadedFoldersCache = loadedFolderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        loadedFoldersCache.clear();
        jest.resetAllMocks();
    });

    it("should update the list of folders in both `cache` and `loadedCache` when `parents` and `children` are returned by the gateway", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue({
                parents: [
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
                        parentId: "folder-1",
                        type
                    },
                    {
                        id: "folder-3",
                        title: "Folder 3",
                        slug: "folder-3",
                        parentId: "folder-2",
                        type
                    }
                ],
                siblings: [
                    {
                        id: "folder-4",
                        title: "Folder 4",
                        slug: "folder-4",
                        parentId: "folder-3",
                        type
                    },
                    {
                        id: "folder-5",
                        title: "Folder 5",
                        slug: "folder-5",
                        parentId: "folder-3",
                        type
                    }
                ]
            })
        };

        const getFolderHierarchy = GetFolderHierarchy.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();
        expect(loadedFoldersCache.hasItems()).toBeFalse();
        await getFolderHierarchy.useCase.execute({ id: "folder-0" });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(gateway.execute).toHaveBeenCalledWith({ type, id: "folder-0" });

        expect(foldersCache.hasItems()).toBeTrue();
        expect(foldersCache.count()).toEqual(5);
        // We are storing only the parent folders id in the loadedFoldersCache
        expect(loadedFoldersCache.count()).toEqual(3);
        expect(loadedFoldersCache.getItems()).toEqual(["folder-1", "folder-2", "folder-3"]);

        // This call should be idempotent: the number of elements in cache should not change
        await getFolderHierarchy.useCase.execute({ id: "folder-0" });
        expect(foldersCache.count()).toEqual(5);
        expect(loadedFoldersCache.count()).toEqual(3);
    });

    it("should only  update the list of folders in `cache` when `children` are returned by the gateway", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue({
                parents: [],
                siblings: [
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
                    }
                ]
            })
        };

        const getFolderHierarchy = GetFolderHierarchy.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();
        expect(loadedFoldersCache.hasItems()).toBeFalse();
        await getFolderHierarchy.useCase.execute({ id: "folder-0" });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(gateway.execute).toHaveBeenCalledWith({ type, id: "folder-0" });

        expect(foldersCache.hasItems()).toBeTrue();
        expect(foldersCache.count()).toEqual(2);
        // We are NOT storing any folder loadedFoldersCache
        expect(loadedFoldersCache.hasItems()).toBeFalse();
    });

    it("should handle gateway errors gracefully", async () => {
        const errorGateway = {
            execute: jest.fn().mockRejectedValue(new Error("Gateway error"))
        };
        const getFolderHierarchy = GetFolderHierarchy.getInstance(type, errorGateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await expect(getFolderHierarchy.useCase.execute({ id: "folder-0" })).rejects.toThrow(
            "Gateway error"
        );

        expect(errorGateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();
    });

    it("should clear cache when type changes", async () => {
        const gatewayAbc = {
            execute: jest.fn().mockResolvedValue({
                parents: [
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
                        parentId: "folder-1",
                        type
                    },
                    {
                        id: "folder-3",
                        title: "Folder 3",
                        slug: "folder-3",
                        parentId: "folder-2",
                        type
                    }
                ],
                siblings: [
                    {
                        id: "folder-4",
                        title: "Folder 4",
                        slug: "folder-4",
                        parentId: "folder-3",
                        type
                    },
                    {
                        id: "folder-5",
                        title: "Folder 5",
                        slug: "folder-5",
                        parentId: "folder-3",
                        type
                    }
                ]
            })
        };

        const newType = "xyz";
        const gatewayXyz = {
            execute: jest.fn().mockResolvedValue({
                parents: [
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
                        parentId: "folder-1",
                        type
                    }
                ],
                siblings: [
                    {
                        id: "folder-3",
                        title: "Folder 3",
                        slug: "folder-4",
                        parentId: "folder-2",
                        type
                    }
                ]
            })
        };

        const getFolderHierarchyAbc = GetFolderHierarchy.getInstance(type, gatewayAbc);

        expect(foldersCache.hasItems()).toBeFalse();

        await getFolderHierarchyAbc.useCase.execute({ id: "folder-0" });

        expect(gatewayAbc.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.count()).toEqual(5);
        expect(loadedFoldersCache.count()).toEqual(3);

        const foldersCacheXyz = folderCacheFactory.getCache(newType);
        const loadedFoldersCacheXyz = loadedFolderCacheFactory.getCache(newType);
        const getFolderHierarchyXyz = GetFolderHierarchy.getInstance(newType, gatewayXyz);

        expect(foldersCacheXyz.hasItems()).toBeFalse();
        expect(loadedFoldersCacheXyz.hasItems()).toBeFalse();

        await getFolderHierarchyXyz.useCase.execute({ id: "folder-0" });

        expect(gatewayXyz.execute).toHaveBeenCalledTimes(1);
        expect(foldersCacheXyz.count()).toEqual(3);
        expect(loadedFoldersCacheXyz.count()).toEqual(2);
    });
});
