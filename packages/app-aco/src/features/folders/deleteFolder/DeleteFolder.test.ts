import { DeleteFolder } from "./DeleteFolder";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";
import { Folder } from "../Folder";

describe("DeleteFolder", () => {
    const type = "abc";
    const gateway = {
        execute: jest.fn().mockResolvedValue(true)
    };
    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        foldersCache.addItems([
            Folder.create({
                id: "any-folder-id",
                title: "New Folder",
                slug: "new-folder",
                parentId: null,
                permissions: [],
                type
            })
        ]);
    });

    it("should be able to delete a folder", async () => {
        const deleteFolder = DeleteFolder.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeTrue();
        const item = foldersCache.getItem(folder => folder.id === "any-folder-id");
        expect(item?.id).toEqual("any-folder-id");

        await deleteFolder.execute({
            id: "any-folder-id",
            title: "New Folder",
            slug: "new-folder",
            parentId: null,
            permissions: [],
            type
        });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeFalse();
    });
});
