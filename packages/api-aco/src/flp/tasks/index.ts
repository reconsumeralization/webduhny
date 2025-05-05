import { createFlpTask } from "./createFlp.task";
import { updateFlpTask } from "./updateFlp.task";
import { deleteFlpTask } from "./deleteFlp.task";
import { syncFlpTask } from "./syncFlp.task";

export const CREATE_FLP_TASK_ID = "acoCreateFlp";
export const DELETE_FLP_TASK_ID = "acoDeleteFlp";
export const UPDATE_FLP_TASK_ID = "acoUpdateFlp";
export const SYNC_FLP_TASK_ID = "acoSyncFlp";

export const flpTasks = () => {
    return [createFlpTask(), updateFlpTask(), deleteFlpTask(), syncFlpTask()];
};
