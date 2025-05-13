import { createElasticsearchClient } from "@webiny/project-utils/testing/elasticsearch/createClient";

import {
    assertNotError,
    createDdbEsMigrationHandler,
    getDynamoToEsTable,
    getPrimaryDynamoDbTable,
    groupMigrations,
    insertDynamoDbTestData as insertTestData,
    logTestNameBeforeEachTest
} from "~tests/utils";
import { Flp_5_43_0_001 } from "~/migrations/5.43.0/001/ddb-es";
import { createLocalesData, createTenantsData } from "../common";

import { StepFunctionService } from "@webiny/tasks/service/StepFunctionServicePlugin";
import { esCreateIndex } from "~/utils";
import { ACO_FOLDER_MODEL_ID } from "~tests/migrations/5.43.0/001/constants";

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

describe("5.43.0-001 DDB + ES", () => {
    const ddbTable = getPrimaryDynamoDbTable();
    const ddbToEsTable = getDynamoToEsTable();
    const elasticsearchClient = createElasticsearchClient();

    beforeEach(async () => {
        process.env.ELASTIC_SEARCH_INDEX_PREFIX =
            new Date().toISOString().replace(/\.|\:/g, "-").toLowerCase() + "-";

        await elasticsearchClient.indices.deleteAll();
    });

    afterEach(async () => {
        await elasticsearchClient.indices.deleteAll();
    });

    const insertEmptyFolderIndexes = async () => {
        const tenants = createTenantsData().map(tenant => tenant.data.id);
        const testLocales = createLocalesData();

        for (const tenant of tenants) {
            const locales = testLocales
                .filter(item => item.PK === `T#${tenant}#I18N#L`)
                .map(locale => locale.code) as string[];

            for (const locale of locales) {
                await esCreateIndex({
                    elasticsearchClient,
                    tenant,
                    locale,
                    type: ACO_FOLDER_MODEL_ID,
                    isHeadlessCmsModel: true
                });
            }
        }
    };

    logTestNameBeforeEachTest();

    it("should not run if no tenant found", async () => {
        const handler = createDdbEsMigrationHandler({
            primaryTable: ddbTable,
            dynamoToEsTable: ddbToEsTable,
            elasticsearchClient,
            migrations: [Flp_5_43_0_001]
        });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should not run if no locale found", async () => {
        await insertTestData(ddbTable, [...createTenantsData()]);

        const handler = createDdbEsMigrationHandler({
            primaryTable: ddbTable,
            dynamoToEsTable: ddbToEsTable,
            elasticsearchClient,
            migrations: [Flp_5_43_0_001]
        });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should not run if no folders found", async () => {
        await insertTestData(ddbTable, [...createTenantsData(), ...createLocalesData()]);

        const handler = createDdbEsMigrationHandler({
            primaryTable: ddbTable,
            dynamoToEsTable: ddbToEsTable,
            elasticsearchClient,
            migrations: [Flp_5_43_0_001]
        });

        const { data, error } = await handler();

        assertNotError(error);
        const grouped = groupMigrations(data.migrations);

        expect(grouped.executed.length).toBe(0);
        expect(grouped.skipped.length).toBe(1);
        expect(grouped.notApplicable.length).toBe(0);
    });

    it("should execute migration", async () => {
        await insertTestData(ddbTable, [...createTenantsData(), ...createLocalesData()]);
        await insertEmptyFolderIndexes();

        const handler = createDdbEsMigrationHandler({
            primaryTable: ddbTable,
            dynamoToEsTable: ddbToEsTable,
            elasticsearchClient,
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
