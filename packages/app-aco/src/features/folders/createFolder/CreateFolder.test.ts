import { CreateFolder } from "./CreateFolder";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";

describe("CreateFolder", () => {
    const type = "abc";
    const gateway = {
        execute: jest.fn().mockResolvedValue({
            id: "any-folder-id",
            title: "New Folder",
            slug: "new-folder",
            type
        })
    };
    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
    });

    it("should be able to create a new folder", async () => {
        const createFolder = CreateFolder.getInstance(type, gateway);

        expect(foldersCache.hasItems()).toBeFalse();

        await createFolder.execute({
            title: "New Folder",
            slug: "new-folder",
            parentId: null,
            permissions: [],
            type
        });

        expect(gateway.execute).toHaveBeenCalledTimes(1);
        expect(foldersCache.hasItems()).toBeTrue();

        const item = foldersCache.getItem(folder => folder.slug === "new-folder");

        expect(item).toBeDefined();
        expect(item?.id).toEqual("any-folder-id");
        expect(item?.type).toEqual(type);
        expect(item?.title).toEqual("New Folder");
        expect(item?.slug).toEqual("new-folder");
    });
});
