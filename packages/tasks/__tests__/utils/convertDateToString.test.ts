import { convertDateToString } from "~/utils/convertDateToString";

describe("convertDateToString", () => {
    it("should convert Date objects to ISO strings", () => {
        const result = convertDateToString({
            date: new Date("2023-10-01T12:00:00Z"),
            nested: {
                date: new Date("2023-10-02T12:00:00Z")
            },
            array: [new Date("2023-10-03T12:00:00Z"), { date: new Date("2023-10-04T12:00:00Z") }]
        });

        expect(result).toEqual({
            date: "2023-10-01T12:00:00.000Z",
            nested: {
                date: "2023-10-02T12:00:00.000Z"
            },
            array: ["2023-10-03T12:00:00.000Z", { date: "2023-10-04T12:00:00.000Z" }]
        });
    });
});
