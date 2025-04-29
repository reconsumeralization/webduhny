import {
    createRecordsDataDeploymentTable,
    type IRecordsDataDeploymentTable,
    type IRecordsDataDeploymentTableParams
} from "~/resolver/app/data/RecordsDataDeploymentTable.js";

export const createMockTable = (
    params: Pick<IRecordsDataDeploymentTableParams, "createRecordsDataDeploymentTableItem"> &
        Partial<Pick<IRecordsDataDeploymentTableParams, "name">>
): IRecordsDataDeploymentTable => {
    return createRecordsDataDeploymentTable({
        name: params.name || "testTable",
        createRecordsDataDeploymentTableItem: params.createRecordsDataDeploymentTableItem
    });
};
