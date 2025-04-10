import { GetDescendantFolders } from "./GetDescendantFolders";
import { folderCacheFactory } from "../cache/FoldersCacheFactory";
import { Folder } from "../Folder";

describe("GetDescendantFolders", () => {
    const type = "abc";
    const foldersCache = folderCacheFactory.getCache(type);

    beforeEach(() => {
        foldersCache.clear();
        foldersCache.addItems([
            Folder.create({
                id: "folder-1",
                title: "Folder 1",
                slug: "folder-1",
                parentId: null,
                permissions: [],
                type
            }),
            Folder.create({
                id: "folder-2",
                title: "Folder 2",
                slug: "folder-2",
                parentId: null,
                permissions: [],
                type
            }),
            Folder.create({
                id: "folder-3",
                title: "Folder 3",
                slug: "folder-3",
                parentId: "folder-2",
                permissions: [],
                type
            }),
            Folder.create({
                id: "folder-4",
                title: "Folder 4",
                slug: "folder-4",
                parentId: "folder-3",
                permissions: [],
                type
            }),
            Folder.create({
                id: "folder-5",
                title: "Folder 5",
                slug: "folder-5",
                parentId: "folder-3",
                permissions: [],
                type
            })
        ]);
    });

    it("should return all descendants of a folder", async () => {
        const getDescendantFolders = GetDescendantFolders.getInstance(type);

        const descendants = getDescendantFolders.execute({
            id: "folder-2"
        });

        expect(descendants).toEqual([
            {
                id: "folder-2",
                title: "Folder 2",
                slug: "folder-2",
                parentId: null,
                permissions: [],
                type
            },
            {
                id: "folder-3",
                title: "Folder 3",
                slug: "folder-3",
                parentId: "folder-2",
                permissions: [],
                type
            },
            {
                id: "folder-4",
                title: "Folder 4",
                slug: "folder-4",
                parentId: "folder-3",
                permissions: [],
                type
            },
            {
                id: "folder-5",
                title: "Folder 5",
                slug: "folder-5",
                parentId: "folder-3",
                permissions: [],
                type
            }
        ]);
    });

    it("should return the folder it self in case no descendants are found", async () => {
        const getDescendantFolders = GetDescendantFolders.getInstance(type);

        const descendants = getDescendantFolders.execute({
            id: "folder-1"
        });

        expect(descendants).toEqual([
            {
                id: "folder-1",
                title: "Folder 1",
                slug: "folder-1",
                parentId: null,
                permissions: [],
                type
            }
        ]);
    });

    it("should return empty array if folder does not exist", async () => {
        const getDescendantFolders = GetDescendantFolders.getInstance(type);

        const descendants = getDescendantFolders.execute({
            id: "non-existent-folder"
        });

        expect(descendants).toEqual([]);
    });
});
