import { CreateFlp, DeleteFlp, UpdateFlp } from "~/flp/useCases";
import { useHandler } from "~tests/utils/useHandler";
import type { Folder } from "~/folder/folder.types";
import { ROOT_FOLDER } from "~/constants";

describe("Folder Level Permissions -  CREATE FLP", () => {
    const { handler } = useHandler();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an FLP record without a parent folder", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);

        const folder = {
            id: "folder1",
            type: "type1",
            slug: "folder1",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(folder as unknown as Folder);

        const flp = await context.aco.flp.get("folder1");

        expect(flp).toMatchObject({
            id: "folder1",
            type: "type1",
            slug: "folder1",
            parentId: ROOT_FOLDER,
            path: `${ROOT_FOLDER}/folder1`,
            permissions: []
        });
    });

    it("should create an FLP record with a parent folder", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);

        const folder1 = {
            id: "folder1",
            type: "type1",
            slug: "folder1",
            parentId: null,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read"
                }
            ]
        };

        const folder2 = {
            id: "folder2",
            type: "type1",
            slug: "folder2",
            parentId: "folder1",
            permissions: []
        };

        await createFlp.execute(folder1 as unknown as Folder);
        await createFlp.execute(folder2 as unknown as Folder);

        const flp = await context.aco.flp.get("folder2");

        expect(flp).toMatchObject({
            id: "folder2",
            type: "type1",
            slug: "folder2",
            parentId: "folder1",
            path: `${ROOT_FOLDER}/folder1/folder2`,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read",
                    inheritedFrom: `parent:${folder1.id}`
                }
            ]
        });
    });

    it("should throw an error if the folder is not provided", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);

        await expect(createFlp.execute(undefined as never)).rejects.toThrow(
            "Missing `folder`, I can't create a new record into the FLP catalog."
        );
    });

    it("should throw an error if the parent FLP is not found", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);

        const folder = {
            id: "folder1",
            type: "type1",
            slug: "folder1",
            parentId: "parentId",
            permissions: []
        };

        await expect(createFlp.execute(folder as unknown as Folder)).rejects.toThrow(
            "Could not find folder level permission."
        );
    });
});

describe("Folder Level Permissions -  DELETE FLP", () => {
    const { handler } = useHandler();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if the folder is not provided", async () => {
        const context = await handler();
        const deleteFlp = new DeleteFlp(context);

        await expect(deleteFlp.execute(undefined as unknown as Folder)).rejects.toThrow(
            "Missing `folder` from the task input, I can't delete the record from the FLP catalog."
        );
    });

    it("should delete an FLP record successfully", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const deleteFlp = new DeleteFlp(context);

        const folder = {
            id: "folder1",
            type: "type1",
            slug: "folder1",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(folder as unknown as Folder);
        await deleteFlp.execute(folder as unknown as Folder);

        await expect(context.aco.flp.get("folder1")).rejects.toThrow(
            "Could not find folder level permission."
        );
    });
});

describe("Folder Level Permissions -  UPDATE FLP - Simple", () => {
    const { handler } = useHandler();
    const type = "type";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should update a root folder's permissions", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const getUpdateFlpInstance = () => new UpdateFlp({ context });

        const folder = {
            type,
            id: "main-folder",
            slug: "main-folder",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(folder as unknown as Folder);

        const updatedFolder = {
            ...folder,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedFolder as unknown as Folder);

        const flp = await context.aco.flp.get(folder.id);
        expect(flp).toMatchObject({
            id: folder.id,
            type,
            slug: folder.slug,
            parentId: ROOT_FOLDER,
            path: `${ROOT_FOLDER}/${folder.slug}`,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read"
                }
            ]
        });
    });

    it("should update a folder's slug and path", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const updateFlp = new UpdateFlp({ context });

        const folder = {
            type,
            id: "folder-1",
            slug: "folder-1",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(folder as unknown as Folder);

        const updatedFolder = {
            ...folder,
            slug: "folder-1-updated"
        };

        await updateFlp.execute(updatedFolder as unknown as Folder);

        const flp = await context.aco.flp.get(folder.id);
        expect(flp).toMatchObject({
            id: folder.id,
            type,
            slug: updatedFolder.slug,
            parentId: ROOT_FOLDER,
            path: `${ROOT_FOLDER}/${updatedFolder.slug}`,
            permissions: []
        });
    });

    it("should update a folder's parent and path", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const updateFlp = new UpdateFlp({ context });

        // Create parent folder
        const parentFolder = {
            type,
            id: "parent-folder",
            slug: "parent-folder",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(parentFolder as unknown as Folder);

        // Create child folder
        const childFolder = {
            type,
            id: "child-folder",
            slug: "child-folder",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(childFolder as unknown as Folder);

        // Update child folder to be under parent
        const updatedChildFolder = {
            ...childFolder,
            parentId: parentFolder.id
        };

        await updateFlp.execute(updatedChildFolder as unknown as Folder);

        const flp = await context.aco.flp.get(childFolder.id);
        expect(flp).toMatchObject({
            id: childFolder.id,
            type,
            slug: childFolder.slug,
            parentId: parentFolder.id,
            path: `${ROOT_FOLDER}/${parentFolder.slug}/${childFolder.slug}`,
            permissions: []
        });
    });

    it("should update a folder's permissions and propagate to direct child", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const getUpdateFlpInstance = () => new UpdateFlp({ context });

        // Create parent folder
        const parentFolder = {
            type,
            id: "parent-folder",
            slug: "parent-folder",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(parentFolder as unknown as Folder);

        // Create child folder
        const childFolder = {
            type,
            id: "child-folder",
            slug: "child-folder",
            parentId: parentFolder.id,
            permissions: []
        };

        await createFlp.execute(childFolder as unknown as Folder);

        // Update parent folder with new permissions
        const updatedParentFolder = {
            ...parentFolder,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedParentFolder as unknown as Folder);

        // Check parent folder
        const parentFlp = await context.aco.flp.get(parentFolder.id);
        expect(parentFlp).toMatchObject({
            id: parentFolder.id,
            type,
            slug: parentFolder.slug,
            parentId: ROOT_FOLDER,
            path: `${ROOT_FOLDER}/${parentFolder.slug}`,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read"
                }
            ]
        });

        // Check child folder
        const childFlp = await context.aco.flp.get(childFolder.id);
        expect(childFlp).toMatchObject({
            id: childFolder.id,
            type,
            slug: childFolder.slug,
            parentId: parentFolder.id,
            path: `${ROOT_FOLDER}/${parentFolder.slug}/${childFolder.slug}`,
            permissions: [
                {
                    target: "admin:1234",
                    level: "read",
                    inheritedFrom: `parent:${parentFolder.id}`
                }
            ]
        });
    });

    it("should handle timeout during update", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);

        // Create a folder with many children
        const parentFolder = {
            type,
            id: "main-folder",
            slug: "main-folder",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(parentFolder as unknown as Folder);

        // Create 5 child folders
        for (let i = 0; i < 5; i++) {
            const childFolder = {
                type,
                id: `child-folder-${i}`,
                slug: `child-folder-${i}`,
                parentId: parentFolder.id,
                permissions: []
            };
            await createFlp.execute(childFolder as unknown as Folder);
        }

        // Create updateFlp with timeout after 2 updates
        let updateCount = 0;
        const updateFlp = new UpdateFlp({
            context,
            isCloseToTimeout: () => {
                updateCount++;
                return updateCount > 2;
            },
            handleTimeout: updated => {
                expect(updated).toHaveLength(3); // parent + 2 children
            }
        });

        // Update parent folder
        const updatedParentFolder = {
            ...parentFolder,
            permissions: [
                {
                    target: "admin:user1",
                    level: "read"
                }
            ]
        };

        await updateFlp.execute(updatedParentFolder as unknown as Folder);

        // Verify that only 3 folders were updated
        const parentFlp = await context.aco.flp.get(parentFolder.id);
        expect(parentFlp.permissions).toHaveLength(1);

        // Check that some children were updated and some weren't
        let updatedChildren = 0;
        for (let i = 0; i < 5; i++) {
            const childFlp = await context.aco.flp.get(`child-folder-${i}`);
            if (childFlp.permissions.length > 0) {
                updatedChildren++;
            }
        }
        expect(updatedChildren).toBe(2);
    });
});

/**
 * Folder Structures Used in Tests:
 *
 * 1. Multi-branch Structure:
 *    main
 *    ├── branch1
 *    │   └── branch1-sub
 *    └── branch2
 *        └── branch2-sub
 *
 * 2. Deep Nested Structure:
 *    level1
 *    └── level2
 *        └── level3
 *            └── level4
 *
 * 3. Moving Branch Structure:
 *    main1    main2
 *    └── branch
 *        └── subfolder
 *
 * Permission Inheritance Flow:
 * - Main folder permissions flow down to all children
 * - Branch permissions are added to inherited permissions
 * - Moving a branch updates all paths and permissions
 */

describe("Folder Level Permissions -  UPDATE FLP - Complex", () => {
    const { handler } = useHandler();
    const type = "type";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should handle multi-branch updates with different permissions", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const getUpdateFlpInstance = () => new UpdateFlp({ context });

        // Create main folder
        const mainFolder = {
            type,
            id: "main",
            slug: "main",
            parentId: null,
            permissions: []
        };

        await createFlp.execute(mainFolder as unknown as Folder);

        // Create two branches under main
        const branch1 = {
            type,
            id: "branch1",
            slug: "branch1",
            parentId: mainFolder.id,
            permissions: []
        };

        const branch2 = {
            type,
            id: "branch2",
            slug: "branch2",
            parentId: mainFolder.id,
            permissions: []
        };

        await createFlp.execute(branch1 as unknown as Folder);
        await createFlp.execute(branch2 as unknown as Folder);

        // Create subfolders in each branch
        const branch1Subfolder = {
            type,
            id: "branch1-sub",
            slug: "branch1-sub",
            parentId: branch1.id,
            permissions: []
        };

        const branch2Subfolder = {
            type,
            id: "branch2-sub",
            slug: "branch2-sub",
            parentId: branch2.id,
            permissions: []
        };

        await createFlp.execute(branch1Subfolder as unknown as Folder);
        await createFlp.execute(branch2Subfolder as unknown as Folder);

        // Update main with permissions
        const updatedMain = {
            ...mainFolder,
            permissions: [
                {
                    target: "admin:user1",
                    level: "read"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedMain as unknown as Folder);

        // Verify all folders have inherited main permissions
        // Verify main folder has its own permissions
        const mainFlp = await context.aco.flp.get(mainFolder.id);
        expect(mainFlp.permissions).toMatchObject([
            {
                target: "admin:user1",
                level: "read"
            }
        ]);

        // Verify branch1 inherited permissions from main
        const branch1Flp1 = await context.aco.flp.get(branch1.id);
        expect(branch1Flp1.permissions).toMatchObject([
            {
                target: "admin:user1",
                level: "read",
                inheritedFrom: `parent:${mainFolder.id}`
            }
        ]);

        // Verify branch2 inherited permissions from main
        const branch2Flp1 = await context.aco.flp.get(branch2.id);
        expect(branch2Flp1.permissions).toMatchObject([
            {
                target: "admin:user1",
                level: "read",
                inheritedFrom: `parent:${mainFolder.id}`
            }
        ]);

        // Verify branch1 subfolder inherited permissions from branch1
        const branch1SubFlp1 = await context.aco.flp.get(branch1Subfolder.id);
        expect(branch1SubFlp1.permissions).toMatchObject([
            {
                target: "admin:user1",
                level: "read",
                inheritedFrom: `parent:${mainFolder.id}`
            }
        ]);

        // Verify branch2 subfolder inherited permissions from branch2
        const branch2SubFlp1 = await context.aco.flp.get(branch2Subfolder.id);
        expect(branch2SubFlp1.permissions).toMatchObject([
            {
                target: "admin:user1",
                level: "read",
                inheritedFrom: `parent:${mainFolder.id}`
            }
        ]);

        // Update branch1 with its own permissions
        const updatedBranch1 = {
            ...branch1,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedBranch1 as unknown as Folder);

        // Verify branch1 and its subfolder have both permissions
        const branch1Flp2 = await context.aco.flp.get(branch1.id);
        expect(branch1Flp2).toMatchObject({
            id: branch1.id,
            type,
            slug: branch1.slug,
            parentId: mainFolder.id,
            path: `${ROOT_FOLDER}/${mainFolder.slug}/${branch1.slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write"
                },
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${mainFolder.id}`
                }
            ]
        });

        const branch1SubFlp2 = await context.aco.flp.get(branch1Subfolder.id);
        expect(branch1SubFlp2).toMatchObject({
            id: branch1Subfolder.id,
            type,
            slug: branch1Subfolder.slug,
            parentId: branch1.id,
            path: `${ROOT_FOLDER}/${mainFolder.slug}/${branch1.slug}/${branch1Subfolder.slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write",
                    inheritedFrom: `parent:${branch1.id}`
                },
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${mainFolder.id}`
                }
            ]
        });

        // Verify branch2 and its subfolder still only have main permissions
        const branch2Flp2 = await context.aco.flp.get(branch2.id);
        expect(branch2Flp2).toMatchObject({
            id: branch2.id,
            type,
            slug: branch2.slug,
            parentId: mainFolder.id,
            path: `${ROOT_FOLDER}/${mainFolder.slug}/${branch2.slug}`,
            permissions: [
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${mainFolder.id}`
                }
            ]
        });

        const branch2SubFlp2 = await context.aco.flp.get(branch2Subfolder.id);
        expect(branch2SubFlp2).toMatchObject({
            id: branch2Subfolder.id,
            type,
            slug: branch2Subfolder.slug,
            parentId: branch2.id,
            path: `${ROOT_FOLDER}/${mainFolder.slug}/${branch2.slug}/${branch2Subfolder.slug}`,
            permissions: [
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${mainFolder.id}`
                }
            ]
        });
    });

    it("should handle deep nested folder updates", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const getUpdateFlpInstance = () => new UpdateFlp({ context });

        // Create a deep folder structure
        const folders = [
            {
                type,
                id: "level1",
                slug: "level1",
                parentId: null,
                permissions: []
            },
            {
                type,
                id: "level2",
                slug: "level2",
                parentId: "level1",
                permissions: []
            },
            {
                type,
                id: "level3",
                slug: "level3",
                parentId: "level2",
                permissions: []
            },
            {
                type,
                id: "level4",
                slug: "level4",
                parentId: "level3",
                permissions: []
            }
        ];

        // Create all folders
        for (const folder of folders) {
            await createFlp.execute(folder as unknown as Folder);
        }

        // Update level1 with permissions
        const updatedLevel1 = {
            ...folders[0],
            permissions: [
                {
                    target: "admin:user1",
                    level: "read"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedLevel1 as unknown as Folder);

        // Verify all levels have inherited permissions
        for (let i = 0; i < folders.length; i++) {
            const folder = folders[i];
            const flp = await context.aco.flp.get(folder.id);

            const expectedPath = folders
                .slice(0, i + 1)
                .map(f => f.slug)
                .join("/");

            if (i === 0) {
                expect(flp).toMatchObject({
                    id: folder.id,
                    type,
                    slug: folder.slug,
                    parentId: ROOT_FOLDER,
                    path: `${ROOT_FOLDER}/${expectedPath}`,
                    permissions: [
                        {
                            target: "admin:user1",
                            level: "read"
                        }
                    ]
                });
            } else {
                expect(flp).toMatchObject({
                    id: folder.id,
                    type,
                    slug: folder.slug,
                    parentId: folders[i - 1].id,
                    path: `${ROOT_FOLDER}/${expectedPath}`,
                    permissions: [
                        {
                            target: "admin:user1",
                            level: "read",
                            inheritedFrom: `parent:${folders[0].id}`
                        }
                    ]
                });
            }
        }

        // Update level3 with its own permissions
        const updatedLevel3 = {
            ...folders[2],
            permissions: [
                {
                    target: "admin:user2",
                    level: "write"
                }
            ]
        };

        await getUpdateFlpInstance().execute(updatedLevel3 as unknown as Folder);

        // Verify level3 and level4 have both permissions
        const level3Flp = await context.aco.flp.get(folders[2].id);

        expect(level3Flp).toMatchObject({
            id: folders[2].id,
            type,
            slug: folders[2].slug,
            parentId: folders[1].id,
            path: `${ROOT_FOLDER}/${folders[0].slug}/${folders[1].slug}/${folders[2].slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write"
                },
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${folders[0].id}`
                }
            ]
        });

        const level4Flp = await context.aco.flp.get(folders[3].id);
        expect(level4Flp).toMatchObject({
            id: folders[3].id,
            type,
            slug: folders[3].slug,
            parentId: folders[2].id,
            path: `${ROOT_FOLDER}/${folders[0].slug}/${folders[1].slug}/${folders[2].slug}/${folders[3].slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write",
                    inheritedFrom: `parent:${folders[2].id}`
                },
                {
                    target: "admin:user1",
                    level: "read",
                    inheritedFrom: `parent:${folders[0].id}`
                }
            ]
        });
    });

    it("should handle moving a branch to a different parent", async () => {
        const context = await handler();
        const createFlp = new CreateFlp(context);
        const getUpdateFlpInstance = () => new UpdateFlp({ context });

        // Create two main folders
        const main1 = {
            type,
            id: "main1",
            slug: "main1",
            parentId: null,
            permissions: [
                {
                    target: "admin:user1",
                    level: "read"
                }
            ]
        };

        const main2 = {
            type,
            id: "main2",
            slug: "main2",
            parentId: null,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write"
                }
            ]
        };

        await createFlp.execute(main1 as unknown as Folder);
        await createFlp.execute(main2 as unknown as Folder);

        // Create a branch under main1
        const branch = {
            type,
            id: "branch",
            slug: "branch",
            parentId: main1.id,
            permissions: []
        };

        await createFlp.execute(branch as unknown as Folder);

        // Create a subfolder in the branch
        const subfolder = {
            type,
            id: "subfolder",
            slug: "subfolder",
            parentId: branch.id,
            permissions: []
        };

        await createFlp.execute(subfolder as unknown as Folder);

        // Move the branch to main2
        const updatedBranch = {
            ...branch,
            parentId: main2.id
        };

        await getUpdateFlpInstance().execute(updatedBranch as unknown as Folder);

        // Verify branch and subfolder have correct paths and permissions
        const branchFlp = await context.aco.flp.get(branch.id);
        expect(branchFlp).toMatchObject({
            id: branch.id,
            type,
            slug: branch.slug,
            parentId: main2.id,
            path: `${ROOT_FOLDER}/${main2.slug}/${branch.slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write",
                    inheritedFrom: `parent:${main2.id}`
                }
            ]
        });

        const subfolderFlp = await context.aco.flp.get(subfolder.id);
        expect(subfolderFlp).toMatchObject({
            id: subfolder.id,
            type,
            slug: subfolder.slug,
            parentId: branch.id,
            path: `${ROOT_FOLDER}/${main2.slug}/${branch.slug}/${subfolder.slug}`,
            permissions: [
                {
                    target: "admin:user2",
                    level: "write",
                    inheritedFrom: `parent:${main2.id}`
                }
            ]
        });
    });
});
