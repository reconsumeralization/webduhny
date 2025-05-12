import {
    assertNotError,
    createDdbMigrationHandler,
    getPrimaryDynamoDbTable,
    groupMigrations,
    insertDynamoDbTestData as insertTestData,
    logTestNameBeforeEachTest
} from "~tests/utils";
import { Flp_5_43_0_001 } from "~/migrations/5.43.0/001";
import { insertTestFolders } from "./insertTestFolders";
import { createLocalesData, createTenantsData } from "./common";

import { BackgroundTaskService } from "~/utils/BackgroundTaskService";
jest.mock("~/utils/BackgroundTaskService", () => {
    const sendMock = jest.fn().mockResolvedValue({
        tenant: "mockTenant",
        locale: "mockLocale",
        id: "mockId",
        definitionId: "mockDefId",
        name: "mockTask",
        input: { type: "*" }
    });

    const BackgroundTaskService = jest.fn().mockImplementation(() => ({
        send: sendMock
    }));

    // Explicitly mock the prototype's send method
    BackgroundTaskService.prototype.send = sendMock;

    return {
        BackgroundTaskService,
        __esModule: true,
        sendMock // Export the mock for testing
    };
});

jest.retryTimes(0);
jest.setTimeout(900000);

describe("5.43.0-001", () => {
    const table = getPrimaryDynamoDbTable();

    logTestNameBeforeEachTest();

    it("should not run if no tenant found", async () => {
        const handler = createDdbMigrationHandler({ table, migrations: [Flp_5_43_0_001] });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should not run if no locale found", async () => {
        await insertTestData(table, [...createTenantsData()]);

        const handler = createDdbMigrationHandler({ table, migrations: [Flp_5_43_0_001] });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should not run if no folders found", async () => {
        await insertTestData(table, [...createTenantsData(), ...createLocalesData()]);

        const handler = createDdbMigrationHandler({ table, migrations: [Flp_5_43_0_001] });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should execute migration", async () => {
        await insertTestData(table, [...createTenantsData(), ...createLocalesData()]);
        await insertTestFolders(table, "cms:article");

        const handler = createDdbMigrationHandler({
            table,
            migrations: [Flp_5_43_0_001]
        });
        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(1);
        expect(grouped.skipped.length).toBe(0);
        expect(grouped.notApplicable.length).toBe(0);

        expect(BackgroundTaskService).toHaveBeenCalledWith(table);
        expect(BackgroundTaskService.prototype.send).toHaveBeenCalledTimes(5);
        expect(BackgroundTaskService.prototype.send).toHaveBeenCalledWith({
            definitionId: "acoSyncFlp",
            input: { type: "*" },
            localeCode: expect.stringMatching(/^(en-US|fr-FR|de-DE)$/),
            taskName: "5_43_0_001_sync_folder_flp",
            tenantId: expect.stringMatching(/^(root|otherTenant)$/)
        });
    });
});
