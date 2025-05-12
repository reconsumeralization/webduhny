export const createFolderData = () => {
    return [
        // Root folders with their own permissions
        {
            id: "test1",
            parentId: null,
            title: "Test 1",
            slug: "test-1",
            permissions: [
                {
                    target: "admin:user-1",
                    level: "owner"
                },
                {
                    target: "team:team-1",
                    level: "viewer"
                }
            ]
        },
        {
            id: "test2",
            parentId: null,
            title: "Test 2",
            slug: "test-2",
            permissions: [
                {
                    target: "admin:user-2",
                    level: "owner"
                }
            ]
        },
        {
            id: "test3",
            parentId: null,
            title: "Test 3",
            slug: "test-3",
            permissions: null // Null permissions
        },
        // Test1 children with inherited permissions
        {
            id: "test1-1",
            parentId: "test1",
            title: "Test 1-1",
            slug: "test-1-1",
            permissions: null // Null permissions
        },
        {
            id: "test1-2",
            parentId: "test1",
            title: "Test 1-2",
            slug: "test-1-2",
            permissions: [
                {
                    target: "team:team-1",
                    level: "editor" // Override inherited permission
                }
            ]
        },
        // Test2 children with mixed permissions
        {
            id: "test2-1",
            parentId: "test2",
            title: "Test 2-1",
            slug: "test-2-1",
            permissions: [
                {
                    target: "admin:user-2",
                    level: "editor" // Override inherited permission
                },
                {
                    target: "admin:user-1",
                    level: "editor" // Additional permission
                }
            ]
        },
        {
            id: "test2-2",
            parentId: "test2",
            title: "Test 2-2",
            slug: "test-2-2",
            permissions: null // Null permissions
        },
        // Test3 children with various scenarios
        {
            id: "test3-1",
            parentId: "test3",
            title: "Test 3-1",
            slug: "test-3-1",
            permissions: [
                {
                    target: "team:team-1",
                    level: "owner"
                }
            ]
        },
        {
            id: "test3-2",
            parentId: "test3",
            title: "Test 3-2",
            slug: "test-3-2",
            permissions: null // Null permissions
        },
        {
            id: "test3-3",
            parentId: "test3",
            title: "Test 3-3",
            slug: "test-3-3",
            permissions: [
                {
                    target: "admin:user-1",
                    level: "viewer"
                },
                {
                    target: "admin:user-2",
                    level: "editor"
                }
            ]
        },
        // Deep nested folder with inherited permissions from ancestor
        {
            id: "test1-1-1",
            parentId: "test1-1",
            title: "Test 1-1-1",
            slug: "test-1-1-1",
            permissions: [
                {
                    target: "team:team-1",
                    level: "owner" // Override inherited permission
                }
            ]
        }
    ];
};
