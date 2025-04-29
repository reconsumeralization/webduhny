import {
    createRecordsDataDeploymentTableItem,
    RecordsDataDeploymentTableItem
} from "~/resolver/app/data/RecordsDataDeploymentTableItem.js";

describe("RecordsDataDeploymentTableItem", () => {
    it("should create table item via class", () => {
        const item = new RecordsDataDeploymentTableItem({
            PK: "pk1",
            SK: "sk1",
            command: "put"
        });

        expect(item).toEqual({
            PK: "pk1",
            SK: "sk1",
            command: "put"
        });
    });

    it("should create table item via function", () => {
        const item = createRecordsDataDeploymentTableItem({
            PK: "pk1",
            SK: "sk1",
            command: "put"
        });

        expect(item).toEqual({
            PK: "pk1",
            SK: "sk1",
            command: "put"
        });
    });
});
