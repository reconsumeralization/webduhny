import { useHandler } from "~tests/translations/useHandler";
import {
    DeleteTranslatableCollectionUseCase,
    GetTranslatableCollectionUseCase,
    SaveTranslatableCollectionUseCase
} from "~/translations";

describe("DeleteTranslatableCollectionUseCase", () => {
    it("should delete a collection", async () => {
        const { handler } = useHandler();
        const context = await handler();

        // Setup
        const saveTranslatableCollection = new SaveTranslatableCollectionUseCase(context);
        const newCollection = await saveTranslatableCollection.execute({
            collectionId: "collection:1",
            items: [
                { itemId: "element:1", value: "Value 1" },
                { itemId: "element:2", value: "Value 2" }
            ]
        });

        const getTranslatableCollection = new GetTranslatableCollectionUseCase(context);
        const collection = await getTranslatableCollection.execute(newCollection.getCollectionId());

        expect(collection).toBeTruthy();
        expect(collection!.getCollectionId()).toEqual(newCollection.getCollectionId());

        // Test
        const deleteTranslatableCollection = new DeleteTranslatableCollectionUseCase(context);
        await deleteTranslatableCollection.execute({
            collectionId: "collection:1"
        });

        const checkCollection = await getTranslatableCollection.execute("collection:1");
        expect(checkCollection).toBeUndefined();
    });
});
