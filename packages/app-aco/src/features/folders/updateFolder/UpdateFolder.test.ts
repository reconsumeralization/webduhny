import { UpdateFolder } from "./UpdateFolder";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";
import { Folder } from "../Folder";

describe("UpdateFolder", () => {
    const type = "abc";

    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        jest.clearAllMocks();
        foldersCache.clear();
        foldersCache.addItems([
            Folder.create({
                id: "any-folder-id",
                title: "Any Folder",
                slug: "any-folder",
                parentId: null,
                permissions: [],
                type
            })
        ]);
    });

    it("should be able to update a folder", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue({
                id: "any-folder-id",
                title: "Updated Folder",
                slug: "updated-folder",
                parentId: "another-id",
                permissions: [],
                type
            })
        };

        const updateFolder = UpdateFolder.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeTrue();
        const item = foldersCache.getItem(folder => folder.id === "any-folder-id");
        expect(item?.id).toEqual("any-folder-id");
        expect(item?.title).toEqual("Any Folder");

        await updateFolder.execute({
            id: "any-folder-id",
            title: "Updated Folder",
            slug: "updated-folder",
            parentId: "another-id",
            permissions: [],
            type
        });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        const updatedItem = foldersCache.getItem(folder => folder.id === "any-folder-id");

        expect(updatedItem).toBeDefined();
        expect(updatedItem?.id).toEqual("any-folder-id");
        expect(updatedItem?.type).toEqual(type);
        expect(updatedItem?.title).toEqual("Updated Folder");
        expect(updatedItem?.slug).toEqual("updated-folder");
        expect(updatedItem?.parentId).toEqual("another-id");
    });

    it("should not update a folder if id is missing", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue(null)
        };

        const updateFolder = UpdateFolder.getInstance(type, gateway);

        await updateFolder.execute({
            id: "",
            title: "Updated Folder",
            slug: "updated-folder",
            parentId: "another-id",
            permissions: [],
            type
        });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        const updatedItem = foldersCache.getItem(folder => folder.id === "any-folder-id");

        expect(updatedItem).toBeDefined();
        expect(updatedItem?.id).toEqual("any-folder-id");
        expect(updatedItem?.type).toEqual(type);
        expect(updatedItem?.title).toEqual("Any Folder");
        expect(updatedItem?.slug).toEqual("any-folder");
        expect(updatedItem?.parentId).toEqual(null);
    });

    it("should propagate permissions to child folders", async () => {
        const gateway = {
            execute: jest.fn().mockResolvedValue({
                id: "parent-folder-id",
                title: "Parent Folder",
                slug: "parent-folder",
                parentId: null,
                permissions: [{ level: "viewer", target: "admin:123" }],
                type
            })
        };

        const parentFolder = Folder.create({
            id: "parent-folder-id",
            title: "Parent Folder",
            slug: "parent-folder",
            parentId: null,
            permissions: [],
            type
        });

        const childFolder1 = Folder.create({
            id: "child-folder-id-1",
            title: "Child Folder 1",
            slug: "child-folder-1",
            parentId: parentFolder.id,
            permissions: [],
            type
        });

        const childFolder2 = Folder.create({
            id: "child-folder-id-2",
            title: "Child Folder 2",
            slug: "child-folder-2",
            parentId: childFolder1.id,
            permissions: [],
            type
        });

        foldersCache.addItems([parentFolder, childFolder1, childFolder2]);

        const updateFolder = UpdateFolder.getInstance(type, gateway);

        await updateFolder.execute({
            id: "parent-folder-id",
            title: "Parent Folder",
            slug: "parent-folder",
            parentId: null,
            permissions: [{ level: "viewer", target: "admin:123" }],
            type
        });

        const childFolderCache1 = foldersCache.getItem(folder => folder.id === childFolder1.id);
        expect(childFolderCache1?.permissions).toContainEqual({
            level: "viewer",
            target: "admin:123",
            inheritedFrom: `parent:${parentFolder.id}`
        });

        const childFolderCache2 = foldersCache.getItem(folder => folder.id === childFolder2.id);
        expect(childFolderCache2?.permissions).toContainEqual({
            level: "viewer",
            target: "admin:123",
            inheritedFrom: `parent:${parentFolder.id}`
        });
    });

    it("should handle gateway errors gracefully", async () => {
        const gateway = {
            execute: jest.fn().mockRejectedValue(new Error("Gateway error"))
        };

        const updateFolder = UpdateFolder.getInstance(type, gateway);

        await expect(
            updateFolder.execute({
                id: "any-folder-id",
                title: "Updated Folder",
                slug: "updated-folder",
                parentId: "another-id",
                permissions: [],
                type
            })
        ).rejects.toThrow("Gateway error");

        expect(gateway.execute).toHaveBeenCalledTimes(1);
    });
});
