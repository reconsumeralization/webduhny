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

        const childFolder3 = Folder.create({
            id: "child-folder-id-3",
            title: "Child Folder 3",
            slug: "child-folder-3",
            parentId: parentFolder.id, // <-- This folder is a sibling of childFolder1, not a child
            permissions: [],
            type
        });

        foldersCache.addItems([parentFolder, childFolder1, childFolder2, childFolder3]);

        {
            // Let's update parentFolder, the change should be propagated to all it's children (childFolder1, childFolder2 and childFolder3).
            const newPermissions = [{ level: "viewer", target: "admin:123" }];

            const gateway = {
                execute: jest.fn().mockResolvedValue({
                    id: parentFolder.id,
                    title: parentFolder.title,
                    slug: parentFolder.slug,
                    parentId: parentFolder.parentId,
                    permissions: newPermissions,
                    type
                })
            };
            const updateFolder = UpdateFolder.getInstance(type, gateway);

            await updateFolder.execute({
                id: parentFolder.id,
                title: parentFolder.title,
                slug: parentFolder.slug,
                parentId: parentFolder.parentId,
                permissions: newPermissions,
                type
            });

            const childFolderCache1 = foldersCache.getItem(folder => folder.id === childFolder1.id);
            expect(childFolderCache1?.permissions).toEqual([
                {
                    ...newPermissions[0],
                    inheritedFrom: `parent:${parentFolder?.id}`
                }
            ]);

            const childFolderCache2 = foldersCache.getItem(folder => folder.id === childFolder2.id);
            expect(childFolderCache2?.permissions).toEqual([
                {
                    ...newPermissions[0],
                    inheritedFrom: `parent:${childFolderCache1?.id}`
                }
            ]);

            const childFolderCache3 = foldersCache.getItem(folder => folder.id === childFolder3.id);
            expect(childFolderCache3?.permissions).toEqual([
                {
                    ...newPermissions[0],
                    inheritedFrom: `parent:${parentFolder?.id}`
                }
            ]);
        }

        {
            // Let's update childFolder1, the change should be propagated to childFolder2, but not to childFolder3
            const newPermissions = [{ level: "owner", target: "admin:123" }];

            const gateway = {
                execute: jest.fn().mockResolvedValue({
                    id: childFolder1.id,
                    title: childFolder1.title,
                    slug: childFolder1.slug,
                    parentId: childFolder1.parentId,
                    permissions: newPermissions,
                    type
                })
            };
            const updateFolder = UpdateFolder.getInstance(type, gateway);

            await updateFolder.execute({
                id: childFolder1.id,
                title: childFolder1.title,
                slug: childFolder1.slug,
                parentId: childFolder1.parentId,
                permissions: newPermissions,
                type
            });

            const childFolderCache1 = foldersCache.getItem(folder => folder.id === childFolder1.id);
            expect(childFolderCache1?.permissions).toEqual(newPermissions);

            const childFolderCache2 = foldersCache.getItem(folder => folder.id === childFolder2.id);
            expect(childFolderCache2?.permissions).toEqual([
                {
                    ...newPermissions[0],
                    inheritedFrom: `parent:${childFolderCache1?.id}`
                }
            ]);

            const childFolderCache3 = foldersCache.getItem(folder => folder.id === childFolder3.id);
            expect(childFolderCache3?.permissions).toEqual([
                {
                    target: "admin:123",
                    level: "viewer",
                    inheritedFrom: `parent:${parentFolder?.id}`
                }
            ]);
        }

        {
            // Let's remove childFolder1 permissions, the change should be propagated to childFolder2, but not to childFolder3
            const newPermissions = [];

            const gateway = {
                execute: jest.fn().mockResolvedValue({
                    id: childFolder1.id,
                    title: childFolder1.title,
                    slug: childFolder1.slug,
                    parentId: childFolder1.parentId,
                    permissions: newPermissions,
                    type
                })
            };
            const updateFolder = UpdateFolder.getInstance(type, gateway);

            await updateFolder.execute({
                id: childFolder1.id,
                title: childFolder1.title,
                slug: childFolder1.slug,
                parentId: childFolder1.parentId,
                permissions: newPermissions,
                type
            });

            const childFolderCache1 = foldersCache.getItem(folder => folder.id === childFolder1.id);
            expect(childFolderCache1?.permissions).toEqual(newPermissions);

            const childFolderCache2 = foldersCache.getItem(folder => folder.id === childFolder2.id);
            expect(childFolderCache2?.permissions).toEqual(newPermissions);

            const childFolderCache3 = foldersCache.getItem(folder => folder.id === childFolder3.id);
            expect(childFolderCache3?.permissions).toEqual([
                {
                    target: "admin:123",
                    level: "viewer",
                    inheritedFrom: `parent:${parentFolder?.id}`
                }
            ]);
        }
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
