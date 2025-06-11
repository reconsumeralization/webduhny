import { useCategoryManageHandler } from "~tests/testHelpers/useCategoryManageHandler";
import { setupGroupAndModels } from "~tests/testHelpers/setup";
import { createCategoryManageMethods } from "~tests/contentAPI/helpers/category.manage";
import { createCategoryPreviewMethods } from "~tests/contentAPI/helpers/category.preview";
import { useCategoryPreviewHandler } from "~tests/testHelpers/useCategoryPreviewHandler";

describe("Content Entry - preview - get By ID", () => {
    const manager = useCategoryManageHandler({
        path: "manage/en-US"
    });
    const previewer = useCategoryPreviewHandler({
        path: "preview/en-US"
    });

    const { createCategoryFrom, createCategory, publishCategory } =
        createCategoryManageMethods(manager);

    const { getCategoryById } = createCategoryPreviewMethods(previewer);

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

        const fruitsV2PreviewUnpublished = await getCategoryById(fruitsV2.id);
        const fruitsV1PreviewUnpublished = await getCategoryById(fruitsV1.id);

        expect(fruitsV2PreviewUnpublished).toMatchObject({
            id: fruitsV2.id,
            entryId: fruitsV2.entryId,
            title: fruitsV2.title,
            slug: fruitsV2.slug
        });
        expect(fruitsV1PreviewUnpublished).toMatchObject({
            id: fruitsV1.id,
            entryId: fruitsV1.entryId,
            title: fruitsV1.title,
            slug: fruitsV1.slug
        });

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

        const fruitsV2PreviewPublished = await getCategoryById(fruitsV2.id);
        expect(fruitsV2PreviewPublished).toMatchObject({
            id: fruitsV2.id,
            entryId: fruitsV2.entryId,
            title: fruitsV2.title,
            slug: fruitsV2.slug
        });
    });
});
