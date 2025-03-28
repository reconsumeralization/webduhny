import useGqlHandler from "./useGqlHandler";

jest.setTimeout(100000);

describe("CRUD Test", () => {
    const handler = useGqlHandler();

    const { createCategory, createPageV2, getPage, getPublishedPage } = handler;

    it("creating pages via the new createPagesV2 mutation", async () => {
        await createCategory({
            data: {
                slug: `slug`,
                name: `name`,
                url: `/some-url/`,
                layout: `layout`
            }
        });

        const page = {
            id: "67e15c96026bd2000222d698#0001",
            pid: "67e15c96026bd2000222d698",
            category: "slug",
            version: 1,
            title: "Welcome to Webiny",
            path: "/welcome-to-webiny",
            content: {
                id: "Fv1PpPWu-",
                type: "document",
                data: {
                    settings: {}
                },
                elements: []
            },
            status: "published",
            publishedOn: "2025-03-24T13:22:30.918Z",
            settings: {
                general: {
                    snippet: null,
                    tags: null,
                    layout: "static",
                    image: null
                },
                social: {
                    meta: [],
                    title: null,
                    description: null,
                    image: null
                },
                seo: {
                    title: null,
                    description: null,
                    meta: []
                }
            },
            createdOn: "2025-03-24T13:22:30.363Z",
            createdBy: {
                id: "67e15c7d026bd2000222d67a",
                displayName: "ad min",
                type: "admin"
            }
        };

        // The V2 of the createPage mutation should allow us to create pages with
        // predefined `createdOn`, `createdBy`, `id`, and also immediately have the
        // page published.
        await createPageV2({ data: page });

        const [getPageResponse] = await getPage({ id: page.id });

        expect(getPageResponse).toMatchObject({
            data: {
                pageBuilder: {
                    getPage: {
                        data: {
                            id: "67e15c96026bd2000222d698#0001",
                            pid: "67e15c96026bd2000222d698",
                            editor: "page-builder",
                            category: {
                                slug: "slug"
                            },
                            version: 1,
                            title: "Welcome to Webiny",
                            path: "/welcome-to-webiny",
                            url: "https://www.test.com/welcome-to-webiny",
                            content: {
                                id: "Fv1PpPWu-",
                                type: "document",
                                data: {
                                    settings: {}
                                },
                                elements: []
                            },
                            savedOn: "2025-03-24T13:22:30.363Z",
                            status: "published",
                            locked: true,
                            publishedOn: "2025-03-24T13:22:30.918Z",
                            revisions: [
                                {
                                    id: "67e15c96026bd2000222d698#0001",
                                    status: "published",
                                    locked: true,
                                    version: 1
                                }
                            ],
                            settings: {
                                general: {
                                    snippet: null,
                                    tags: null,
                                    layout: "static",
                                    image: null
                                },
                                social: {
                                    meta: [],
                                    title: null,
                                    description: null,
                                    image: null
                                },
                                seo: {
                                    title: null,
                                    description: null,
                                    meta: []
                                }
                            },
                            createdFrom: null,
                            createdOn: "2025-03-24T13:22:30.363Z",
                            createdBy: {
                                id: "67e15c7d026bd2000222d67a",
                                displayName: "ad min",
                                type: "admin"
                            }
                        },
                        error: null
                    }
                }
            }
        });

        const [getPublishedPageResponse] = await getPublishedPage({ id: page.id });

        expect(getPublishedPageResponse).toMatchObject({
            data: {
                pageBuilder: {
                    getPublishedPage: {
                        data: {
                            id: "67e15c96026bd2000222d698#0001",
                            pid: "67e15c96026bd2000222d698",
                            editor: "page-builder",
                            category: {
                                slug: "slug"
                            },
                            version: 1,
                            title: "Welcome to Webiny",
                            path: "/welcome-to-webiny",
                            url: "https://www.test.com/welcome-to-webiny",
                            content: {
                                id: "Fv1PpPWu-",
                                type: "document",
                                data: {
                                    settings: {}
                                },
                                elements: []
                            },
                            savedOn: "2025-03-24T13:22:30.363Z",
                            status: "published",
                            locked: true,
                            publishedOn: "2025-03-24T13:22:30.918Z",
                            revisions: [
                                {
                                    id: "67e15c96026bd2000222d698#0001",
                                    status: "published",
                                    locked: true,
                                    version: 1
                                }
                            ],
                            settings: {
                                general: {
                                    snippet: null,
                                    tags: null,
                                    layout: "static",
                                    image: null
                                },
                                social: {
                                    meta: [],
                                    title: null,
                                    description: null,
                                    image: null
                                },
                                seo: {
                                    title: null,
                                    description: null,
                                    meta: []
                                }
                            },
                            createdFrom: null,
                            createdOn: "2025-03-24T13:22:30.363Z",
                            createdBy: {
                                id: "67e15c7d026bd2000222d67a",
                                displayName: "ad min",
                                type: "admin"
                            }
                        },
                        error: null
                    }
                }
            }
        });
    });
});
