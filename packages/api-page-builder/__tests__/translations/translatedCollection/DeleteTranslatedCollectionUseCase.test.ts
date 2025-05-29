import { useHandler } from "~tests/translations/useHandler";
import {
    SaveTranslatableCollectionUseCase,
    SaveTranslatableCollectionParams,
    SaveTranslatedCollectionUseCase,
    DeleteTranslatedCollectionUseCase,
    GetTranslatedCollectionUseCase
} from "~/translations";
import { PbContext } from "~/graphql/types";

const createTranslatableCollection = async (
    context: PbContext,
    params: SaveTranslatableCollectionParams
) => {
    const saveCollection = new SaveTranslatableCollectionUseCase(context);
    await saveCollection.execute(params);
};

describe("DeleteTranslatedCollectionUseCase", () => {
    it("should delete an entire collection with all translations", async () => {
        const { handler } = useHandler();
        const context = await handler();

        // Setup
        await createTranslatableCollection(context, {
            collectionId: "collection:1",
            items: [
                { itemId: "element:1", value: "Value 1" },
                { itemId: "element:2", value: "Value 2" },
                { itemId: "element:3", value: "Value 3" }
            ]
        });

        const saveTranslatedCollection = new SaveTranslatedCollectionUseCase(context);
        await saveTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "en",
            items: [
                { itemId: "element:1", value: "Translated Value 1 EN" },
                { itemId: "element:2", value: "Translated Value 2 EN" }
            ]
        });

        await saveTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "de",
            items: [
                { itemId: "element:1", value: "Translated Value 1 DE" },
                { itemId: "element:2", value: "Translated Value 2 DE" }
            ]
        });

        // Test
        const deleteTranslatedCollection = new DeleteTranslatedCollectionUseCase(context);
        await deleteTranslatedCollection.execute({ collectionId: "collection:1" });

        const getTranslatedCollection = new GetTranslatedCollectionUseCase(context);

        await expect(
            getTranslatedCollection.execute({
                collectionId: "collection:1",
                languageCode: "en"
            })
        ).rejects.toThrow("not found");

        await expect(
            getTranslatedCollection.execute({
                collectionId: "collection:1",
                languageCode: "de"
            })
        ).rejects.toThrow("not found");
    });

    it("should delete a collection for a given language", async () => {
        const { handler } = useHandler();
        const context = await handler();

        // Setup
        await createTranslatableCollection(context, {
            collectionId: "collection:1",
            items: [
                { itemId: "element:1", value: "Value 1" },
                { itemId: "element:2", value: "Value 2" },
                { itemId: "element:3", value: "Value 3" }
            ]
        });

        const saveTranslatedCollection = new SaveTranslatedCollectionUseCase(context);
        await saveTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "en",
            items: [
                { itemId: "element:1", value: "Translated Value 1 EN" },
                { itemId: "element:2", value: "Translated Value 2 EN" }
            ]
        });

        await saveTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "de",
            items: [
                { itemId: "element:1", value: "Translated Value 1 DE" },
                { itemId: "element:2", value: "Translated Value 2 DE" }
            ]
        });

        // Test
        const deleteTranslatedCollection = new DeleteTranslatedCollectionUseCase(context);
        await deleteTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "en"
        });

        const getTranslatedCollection = new GetTranslatedCollectionUseCase(context);

        await expect(
            getTranslatedCollection.execute({
                collectionId: "collection:1",
                languageCode: "en"
            })
        ).rejects.toThrow("not found");

        const deCollection = await getTranslatedCollection.execute({
            collectionId: "collection:1",
            languageCode: "de"
        });

        expect(deCollection.getCollectionId()).toBe("collection:1");
        expect(deCollection.getLanguageCode()).toBe("de");
    });
});
