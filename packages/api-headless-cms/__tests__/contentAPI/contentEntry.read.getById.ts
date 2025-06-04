import { useCategoryManageHandler } from "~tests/testHelpers/useCategoryManageHandler";
import { useCategoryReadHandler } from "~tests/testHelpers/useCategoryReadHandler";
import { setupGroupAndModels } from "~tests/testHelpers/setup";
import { createCategoryManageMethods } from "~tests/contentAPI/helpers/category.manage";
import { createCategoryReadMethods } from "~tests/contentAPI/helpers/category.read";

describe("Content Entry - read - get By ID", () => {
    const manager = useCategoryManageHandler({
        path: "manage/en-US"
    });
    const reader = useCategoryReadHandler({
        path: "read/en-US"
    });

    const { createCategoryFrom, createCategory, publishCategory } =
        createCategoryManageMethods(manager);

    const { getCategoryById } = createCategoryReadMethods(reader);

    beforeEach(async () => {
        await setupGroupAndModels({
            manager,
            models: ["category"]
        });
    });

    it("should get an entry by id", async () => {
        const fruitsV1 = await createCategory({
            title: "Fruits",
            slug: "fruits"
        });

        const fruitsV2 = await createCategoryFrom(fruitsV1);

        const fruitsV2ReadUnpublished = await getCategoryById(fruitsV2.id);
        const fruitsV1ReadUnpublished = await getCategoryById(fruitsV1.id);

        expect(fruitsV2ReadUnpublished).toEqual(null);
        expect(fruitsV1ReadUnpublished).toEqual(null);

        const publishedFruitsV2 = await publishCategory(fruitsV2.id);

        expect(publishedFruitsV2).toMatchObject({
            id: fruitsV2.id,
            entryId: fruitsV2.entryId,
            title: fruitsV2.title,
            slug: fruitsV2.slug,
            meta: {
                status: "published"
            }
        });

        const fruitsV2ReadPublished = await getCategoryById(fruitsV2.id);
        expect(fruitsV2ReadPublished).toMatchObject({
            id: fruitsV2.id,
            entryId: fruitsV2.entryId,
            title: fruitsV2.title,
            slug: fruitsV2.slug
        });
    });
});
