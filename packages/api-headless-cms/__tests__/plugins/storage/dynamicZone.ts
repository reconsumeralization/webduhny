import { pageModel } from "../../contentAPI/mocks/pageWithDynamicZonesModel";
import { CmsModel, CmsModelDynamicZoneField } from "~/types";
import { createDynamicZoneStorageTransform } from "~/storage/dynamicZone";
import { createStorageTransform } from "~/storage/index";
import { getStoragePluginFactory } from "~/utils/entryStorage";
import { PluginsContainer } from "@webiny/plugins";

const field = pageModel.fields.find(f => f.id === "peeeyhtc") as CmsModelDynamicZoneField;

const inputValue = [
    {
        text: "Simple Text #1",
        _templateId: "81qiz2v453wx9uque0gox"
    },
    {
        title: "Hero Title #1",
        date: "2024-11-05",
        time: "11:05:59",
        dateTimeWithoutTimezone: new Date("2024-11-05T11:05:59.000Z"),
        dateTimeWithTimezone: "2024-11-05T11:05:59.000+01:00",
        _templateId: "cv2zf965v324ivdc7e1vt"
    },
    {
        title: "Hero Title #2",
        date: "2024-11-05",
        time: "11:05:59",
        dateTimeWithoutTimezone: new Date("2024-11-06T11:05:59.000Z"),
        dateTimeWithTimezone: "2024-11-06T11:05:59.000+01:00",
        _templateId: "cv2zf965v324ivdc7e1vt"
    },
    {
        nestedObject: {
            objectTitle: "Objective title #1",
            objectNestedObject: [
                {
                    nestedObjectNestedTitle: "Content Objecting nested title #1",
                    date: "2024-11-05",
                    time: "11:05:59",
                    dateTimeWithoutTimezone: new Date("2024-11-05T11:05:59.000Z"),
                    dateTimeWithTimezone: "2024-11-05T11:05:59.000+01:00"
                },
                {
                    nestedObjectNestedTitle: "Content Objecting nested title #2",
                    date: "2024-11-05",
                    time: "11:05:59",
                    dateTimeWithoutTimezone: new Date("2024-11-06T11:05:59.000Z"),
                    dateTimeWithTimezone: "2024-11-06T11:05:59.000+01:00"
                }
            ]
        },
        dynamicZone: {
            authors: [
                {
                    id: "john-doe#0001",
                    entryId: "john-doe",
                    modelId: "author"
                }
            ],
            _templateId: "0emukbsvmzpozx2lzk883"
        },
        _templateId: "9ht43gurhegkbdfsaafyads"
    },
    {
        author: {
            id: "john-doe#0001",
            entryId: "john-doe",
            modelId: "author"
        },
        authors: [
            {
                id: "john-doe#0001",
                entryId: "john-doe",
                modelId: "author"
            }
        ],
        _templateId: "qi81z2v453wx9uque0gox"
    }
];
const expectedValue = [
    {
        text: "Simple Text #1",
        _templateId: "81qiz2v453wx9uque0gox"
    },
    {
        title: "Hero Title #1",
        date: "2024-11-05",
        time: "11:05:59",
        dateTimeWithoutTimezone: "2024-11-05T11:05:59.000Z",
        dateTimeWithTimezone: "2024-11-05T11:05:59.000+01:00",
        _templateId: "cv2zf965v324ivdc7e1vt"
    },
    {
        title: "Hero Title #2",
        date: "2024-11-05",
        time: "11:05:59",
        dateTimeWithoutTimezone: "2024-11-06T11:05:59.000Z",
        dateTimeWithTimezone: "2024-11-06T11:05:59.000+01:00",
        _templateId: "cv2zf965v324ivdc7e1vt"
    },
    {
        nestedObject: {
            objectTitle: "Objective title #1",
            objectNestedObject: [
                {
                    nestedObjectNestedTitle: "Content Objecting nested title #1",
                    date: "2024-11-05",
                    time: "11:05:59",
                    dateTimeWithoutTimezone: "2024-11-05T11:05:59.000Z",
                    dateTimeWithTimezone: "2024-11-05T11:05:59.000+01:00"
                },
                {
                    nestedObjectNestedTitle: "Content Objecting nested title #2",
                    date: "2024-11-05",
                    time: "11:05:59",
                    dateTimeWithoutTimezone: "2024-11-06T11:05:59.000Z",
                    dateTimeWithTimezone: "2024-11-06T11:05:59.000+01:00"
                }
            ]
        },
        dynamicZone: {
            authors: [
                {
                    id: "john-doe#0001",
                    entryId: "john-doe",
                    modelId: "author"
                }
            ],
            _templateId: "0emukbsvmzpozx2lzk883"
        },
        _templateId: "9ht43gurhegkbdfsaafyads"
    },
    {
        author: {
            id: "john-doe#0001",
            entryId: "john-doe",
            modelId: "author"
        },
        authors: [
            {
                id: "john-doe#0001",
                entryId: "john-doe",
                modelId: "author"
            }
        ],
        _templateId: "qi81z2v453wx9uque0gox"
    }
];

describe("dynamic zone storage transform", () => {
    const plugins = new PluginsContainer(createStorageTransform());
    const plugin = createDynamicZoneStorageTransform();
    const getStoragePlugin = getStoragePluginFactory({
        plugins
    });

    it("should properly transform data to storage", async () => {
        const result = await plugin.toStorage({
            field,
            value: inputValue,
            getStoragePlugin,
            model: pageModel as CmsModel,
            plugins
        });

        expect(result).toEqual(expectedValue);
    });
});
