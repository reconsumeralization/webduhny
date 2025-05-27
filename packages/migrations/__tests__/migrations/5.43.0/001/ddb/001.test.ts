import {
    assertNotError,
    createDdbMigrationHandler,
    getPrimaryDynamoDbTable,
    groupMigrations,
    insertDynamoDbTestData as insertTestData,
    logTestNameBeforeEachTest
} from "~tests/utils";
import { Flp_5_43_0_001 } from "~/migrations/5.43.0/001/ddb";
import { insertTestFolders } from "../insertTestFolders";
import { createLocalesData, createTenantsData } from "../common";

import { StepFunctionService } from "@webiny/tasks/service/StepFunctionServicePlugin";
jest.mock("@webiny/tasks/service/StepFunctionServicePlugin", () => {
    const sendMock = jest.fn().mockResolvedValue({
        tenant: "mockTenant",
        locale: "mockLocale",
        id: "mockId",
        definitionId: "mockDefId",
        name: "mockTask",
        input: { type: "*" }
    });

    const StepFunctionService = jest.fn().mockImplementation(() => ({
        send: sendMock
    }));

    // Explicitly mock the prototype's send method
    StepFunctionService.prototype.send = sendMock;

    return {
        StepFunctionService,
        __esModule: true,
        sendMock // Export the mock for testing
    };
});

jest.retryTimes(0);
jest.setTimeout(900000);

describe("5.43.0-001 - DDB", () => {
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

        expect(StepFunctionService.prototype.send).toHaveBeenCalledTimes(5);
        expect(StepFunctionService.prototype.send).toHaveBeenCalledWith(
            {
                definitionId: "acoSyncFlp",
                id: expect.any(String)
            },
            0
        );
    });
});
