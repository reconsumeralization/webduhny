import { useGraphQlHandler } from "./utils/useGraphQlHandler";
import { folderMocks } from "~tests/mocks/folder.mock";
import { createPbPageFolderModelModifier } from "~/page/plugins";

describe("Folder Model Extensions", () => {
    const { folders } = useGraphQlHandler({
        plugins: [
            createPbPageFolderModelModifier(({ modifier }) => {
                modifier.addField({
                    id: "carMake",
                    fieldId: "carMake",
                    label: "Car Make",
                    type: "text"
                });

                modifier.addField({
                    id: "year",
                    fieldId: "year",
                    label: "Year of manufacturing",
                    type: "number"
                });

                modifier.addField({
                    id: "aDateTime",
                    fieldId: "aDateTime",
                    type: "datetime",
                    label: "A date time field",
                    renderer: {
                        name: "date-time-input"
                    },
                    settings: {
                        type: "dateTimeWithoutTimezone",
                        defaultSetValue: "current"
                    }
                });

                modifier.addField({
                    id: "article",
                    fieldId: "article",
                    label: "Article",
                    type: "ref",
                    renderer: {
                        name: "ref-advanced-single"
                    },
                    settings: {
                        models: [
                            {
                                modelId: "article"
                            }
                        ]
                    }
                });
            })
        ]
    });

    it("should add custom fields to `extensions` object field", async () => {
        const extensions = {
            pb_page_carMake: "Honda",
            pb_page_year: 2018,
            pb_page_aDateTime: "2020-01-01T00:00:00.000Z",
            pb_page_article: {
                modelId: "article",
                id: "abcdefg#0001"
            }
        };
        const fields = [
            "extensions { pb_page_carMake pb_page_year pb_page_aDateTime pb_page_article { id modelId } }"
        ];

        const createFolderA = await folders
            .createFolder(
                {
                    data: {
                        ...folderMocks.folderA,
                        extensions
                    }
                },
                fields
            )
            .then(([response]) => response.data.aco.createFolder.data);

        expect(createFolderA).toMatchObject({
            ...folderMocks.folderA,
            extensions
        });

        const getFolderA = await folders
            .getFolder({ id: createFolderA.id }, fields)
            .then(([response]) => response.data.aco.getFolder.data);

        expect(getFolderA).toMatchObject({
            ...folderMocks.folderA,
            extensions
        });
    });
});
